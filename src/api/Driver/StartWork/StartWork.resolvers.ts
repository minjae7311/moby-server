import { Resolvers } from "../../../types/resolvers";
import { StartWorkResponse } from "../../../types/graph";
import driverPrivateResolver from "../../../utils/driverPrivateResolver";

const resolvers: Resolvers = {
  Mutation: {
    StartWork: driverPrivateResolver(
      async (_res, _args, { req }): Promise<StartWorkResponse> => {
        const { driver } = req;

        console.log(driver);

        try {
          driver.workingOn = true;
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
