import { Resolvers } from "../../../types/resolvers";
import adminPrivateResolvers from "../../../utils/adminPrivateResolvers";
import {
  UpdateUserDataMutationArgs,
  UpdateUserDataResponse,
} from "../../../types/graph";
import User from "../../../entities/User";

const resolvers: Resolvers = {
  Mutation: {
    UpdateUserData: adminPrivateResolvers(
      async (
        _res,
        args: UpdateUserDataMutationArgs,
        { req }
      ): Promise<UpdateUserDataResponse> => {
        const { admin } = req;

        console.log(admin.id, "Updating User");

        try {
          const { data } = args;

          const user = await User.findOne({ id: data.id });

          if (user) {
            Object.keys(user).forEach((key) => {
              if (key !== "updatedAt" && key !== "createdAt")
                user[key] = data[key];
            });

            await user.save();

            return {
              ok: true,
              error: null,
            };
          } else {
            return {
              ok: false,
              error: "user-not-found",
            };
          }
        } catch (error) {
          return {
            ok: false,
            error: error.message,
          };
        }
      }
    ),
  },
};

export default resolvers;
