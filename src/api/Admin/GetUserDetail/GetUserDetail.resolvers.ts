/** @format */

import { Resolvers } from "../../../types/resolvers";
import adminPrivateResolvers from "../../../utils/adminPrivateResolvers";
import {
  GetUserDetailQueryArgs,
  GetUserDetailResponse,
} from "../../../types/graph";
import User from "../../../entities/User";

const resolvers: Resolvers = {
  Query: {
    GetUserDetail: adminPrivateResolvers(
      async (
        _req,
        args: GetUserDetailQueryArgs,
        { req }
      ): Promise<GetUserDetailResponse> => {
        const { id } = args;

        try {
          const user = await User.findOne(
            { id },
            {
              relations: ["interests", "credit", "verification", "rides"],
            }
          );

          if (user) {
            return {
              ok: true,
              error: null,
              user,
            };
          } else {
            return {
              ok: false,
              error: "user-not-found",
              user: null,
            };
          }
        } catch (e) {
          return {
            ok: false,
            error: e.message,
            user: null,
          };
        }
      }
    ),
  },
};

export default resolvers;
