import { Resolvers } from "../../../types/resolvers";
import {
  UpdateDriverLocationMutationArgs,
  UpdateDriverLocationResponse,
} from "../../../types/graph";
import driverPrivateResolver from "../../../utils/driverPrivateResolver";

const resolvers: Resolvers = {
  Mutation: {
    UpdateDriverLocation: driverPrivateResolver(
      async (
        _res,
        args: UpdateDriverLocationMutationArgs,
        { req, pubSub }
      ): Promise<UpdateDriverLocationResponse> => {
        const { driver } = req;

        console.log(driver);

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
      }
    ),
  },
};

export default resolvers;
