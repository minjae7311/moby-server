import { Resolvers } from "../../../types/resolvers";
import privateResolver from "../../../utils/privateResolver";
import Driver from "../../../entities/Driver";
import {
  GetNearByDriversQueryArgs,
  GetNearByDriversResponse,
} from "../../../types/graph";
import { getRepository, Between } from "typeorm";
import { getDistance } from "../../../utils/getDistance";

/**
 * @static
 */
const FIND_DRIVER_DISTANCE = 10;

const resolver: Resolvers = {
  Query: {
    GetNearbyDrivers: privateResolver(
      async (
        _res,
        args: GetNearByDriversQueryArgs,
        { req }
      ): Promise<GetNearByDriversResponse> => {
        const userLat = args.lat,
          userLng = args.lng;

        try {
          const drivers = await getRepository(Driver).find({
            workingOn: true,
            isDriving: false,
            lat: Between(userLat - 0.05, userLat + 0.05),
            lng: Between(userLng - 0.05, userLng + 0.05),
          });

          const filteredDrivers = drivers.filter((driver) => {
            return (
              getDistance(driver.lat, driver.lng, userLat, userLng) <=
              FIND_DRIVER_DISTANCE
            );
          });

          console.log(`${drivers}\n\n\n${filteredDrivers}`);

          return {
            ok: true,
            error: null,
            drivers: filteredDrivers,
          };
        } catch (error) {
          return {
            ok: false,
            error: error.message,
            drivers: null,
          };
        }
      }
    ),
  },
};

export default resolver;
