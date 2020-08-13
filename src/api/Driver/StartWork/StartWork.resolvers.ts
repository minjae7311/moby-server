import { Resolvers } from "../../../types/resolvers";
import Driver from "../../../entities/Driver";
import { StartWorkResponse, StartWorkMutationArgs } from "../../../types/graph";

const resolvers: Resolvers = {
  Mutation: {
    StartWork: async (
      _res,
      args: StartWorkMutationArgs,
      _req
    ): Promise<StartWorkResponse> => {
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
    },
  },
};

export default resolvers;
