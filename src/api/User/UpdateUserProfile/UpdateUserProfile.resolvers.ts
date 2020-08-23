import User from "../../../entities/User";
import { Resolvers } from "../../../types/resolvers";
import {
  UpdateUserProfileMutationArgs,
  UpdateUserProfileResponse,
} from "../../../types/graph";
import privateResolver from "../../../utils/privateResolver";
import cleanNullArgs from "../../../utils/cleanNullArg";

const resolvers: Resolvers = {
  Mutation: {
    UpdateUserProfile: privateResolver(
      async (
        _,
        args: UpdateUserProfileMutationArgs,
        { req }
      ): Promise<UpdateUserProfileResponse> => {
        const user: User = req.user;

        try {
          const inputArgs = Object.keys(cleanNullArgs(args));

          inputArgs.forEach((key) => {
            user[key] = args[key];
            console.log(key, args[key]);
          });

          await user.save();

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
