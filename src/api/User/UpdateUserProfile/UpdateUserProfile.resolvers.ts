import User from "../../../entities/User";
import { Resolvers } from "../../../types/resolvers";
import {
  UpdateUserProfileMutationArgs,
  UpdateUserProfileResponse,
} from "../../../types/graph";
import privateResolver from "../../../utils/privateResolver";

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
          user.fullName = args.fullName;
          user.profilePhotoUrl = args.profilePhotoUrl;
          user.gender = args.gender;
          user.birthDate = args.birthDate;
          user.job = args.job;

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
