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
      { _req }
    ): Promise<UpdateDriverLocationResponse> => {
      const driver = await Driver.findOne({
        id: args.driverId,
      });

      if (!driver) {
        return {
          ok: false,
          error: "driver-not-found",
        };
      } else {
        try {
          driver.lat = args.lat;
          driver.lng = args.lng;

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
    },
  },
};

export default resolvers;
