/** @format */

import { Resolvers } from "../../../types/resolvers";
import adminPrivateResolvers from "../../../utils/adminPrivateResolvers";
import {
  GetUserListMutationArgs,
  GetUserListResponse,
} from "../../../types/graph";
import User from "../../../entities/User";

const resolvers: Resolvers = {
  Mutation: {
    GetUserList: adminPrivateResolvers(
      async (
        _res,
        args: GetUserListMutationArgs,
        { req }
      ): Promise<GetUserListResponse> => {
        const { admin } = req;
        /**
         * @todo add order
         */
        const { take, page } = args;

        console.log(admin.id, "Getting user lists...");

        try {
          const users = await User.find({
            skip: (page - 1) * take,
            take,
            relations: [
              "interests",
              "credit",
              "verification",
            //   "favPlace",
              "rides",
            ],
          });

          return {
            ok: true,
            error: null,
            users,
          };
        } catch (e) {
          return {
            ok: false,
            error: e.message,
            users: null,
          };
        }
      }
    ),
  },
};

export default resolvers;
