import User from "../../../entities/User";
import { Resolvers } from "../../../types/resolvers";
import {
  InputUserInfoMutationArgs,
  InputUserInfoResponse,
} from "../../../types/graph";
import privateResolver from "../../../utils/privateResolver";

const resolvers: Resolvers = {
  Mutation: {
    InputUserInfo: privateResolver(
      async (
        _,
        args: InputUserInfoMutationArgs,
        { req }
      ): Promise<InputUserInfoResponse> => {
        const user: User = req.user;

        try {
          user.firstName = args.firstName;
          user.lastName = args.lastName;
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
