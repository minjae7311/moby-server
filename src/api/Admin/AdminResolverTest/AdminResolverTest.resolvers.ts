/** @format */

import { Resolvers } from "../../../types/resolvers";
import adminPrivateResolvers from "../../../utils/adminPrivateResolvers";
import { AdminResolverTestResponse } from "../../../types/graph";

const resolvers: Resolvers = {
  Mutation: {
    AdminResolverTest: adminPrivateResolvers(
      async (_res, _args, { req }): Promise<AdminResolverTestResponse> => {
        const { admin } = req;

        console.log(admin);

        return {
          ok: true,
          error: "testing",
        };
      }
    ),
  },
};

export default resolvers;
