import { Resolvers } from "../../../types/resolvers";
import Driver from "../../../entities/Driver";
import { EndWorkResponse, EndWorkMutationArgs } from "../../../types/graph";

const resolvers: Resolvers = {
  Mutation: {
    EndWork: async (
      _res,
      args: EndWorkMutationArgs,
      _req
    ): Promise<EndWorkResponse> => {
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
    },
  },
};

export default resolvers;
