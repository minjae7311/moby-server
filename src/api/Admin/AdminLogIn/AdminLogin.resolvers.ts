/** @format */

import { Resolvers } from "../../../types/resolvers";
import Admin from "../../../entities/Admin";
import { AdminLoginResponse, AdminLoginMutationArgs } from "../../../types/graph";

const resolvers: Resolvers = {
  Mutation: {
    AdminLogin: async (
      _res,
      args: AdminLoginMutationArgs,
      _req
    ): Promise<AdminLoginResponse> => {
      const { loginId, loginPw } = args;
      console.log(loginId, loginPw);

      try {
        const admin = await Admin.findOne({ loginId });
        console.log(admin);

        if (!admin) {
          return {
            ok: false,
            error: "no-admin-found",
          };
        }

        const validPassword = await admin.comparePassword(loginPw);
        console.log(validPassword);

        if (validPassword) {
          return {
            ok: true,
            error: "success",
          };
        } else {
          return {
            ok: false,
            error: "wrong-password",
          };
        }
      } catch (e) {
        return {
          ok: true,
          error: e.message,
        };
      }
    },
  },
};

export default resolvers;
