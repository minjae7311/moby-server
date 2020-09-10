import { Resolvers } from "../../../types/resolvers";
import { EndWorkResponse } from "../../../types/graph";
import driverPrivateResolver from "../../../utils/driverPrivateResolver";

const resolvers: Resolvers = {
  Mutation: {
    EndWork: driverPrivateResolver(
      async (_res, _args, { req }): Promise<EndWorkResponse> => {
        const { driver } = req;

        if (!driver) {
          return {
            ok: false,
            error: "driver-not-found",
          };
        }

        try {
          driver.workingOn = false;
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
