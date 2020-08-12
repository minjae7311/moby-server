import { Resolvers } from "../../../types/resolvers";
import Driver from "../../../entities/Driver";
import {
  UpdateDriverLocationMutationArgs,
  UpdateDriverLocationResponse,
} from "../../../types/graph";

const resolvers: Resolvers = {
  Mutation: {
    UpdateDriverLocation: async (
      _res,
      args: UpdateDriverLocationMutationArgs,
      { _req, pubSub }
    ): Promise<UpdateDriverLocationResponse> => {
      /**
       * @todo 드라이버 다른 방식으로 가져오기.
       */
      const driver = await Driver.findOne({
        id: args.driverId,
      });

      if (!driver) {
        return {
          ok: false,
          error: "driver-not-found",
        };
      }

      if (!driver.workingOn) {
        return {
          ok: false,
          error: "not-working-now",
        };
      }

      try {
        driver.lat = args.lat;
        driver.lng = args.lng;

        pubSub.publish("driverLocationUpdating", {
          SubscribeNearByDrivers: driver,
        });

        await driver.save();

        return {
          ok: true,
          error: null,
        };
      } catch (e) {
        return {
          ok: false,
          error: e.message,
        };
      }
    },
  },
};

export default resolvers;
