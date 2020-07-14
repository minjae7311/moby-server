import { Resolvers } from "../../../types/resolvers";
import { SignInMutationArgs, SignInResponse } from "../../../types/graph";
import User from "../../../entities/User";
import createJWT from "../../../utils/create.JWT";

const resolvers: Resolvers = {
  Mutation: {
    SignIn: async (_, args: SignInMutationArgs): Promise<SignInResponse> => {
      const { phoneNumber, password } = args;

      try {
        const user = await User.findOne({ phoneNumber });

        console.log(user);

        if (!user) {
          return {
            ok: false,
            error: "user_not_found",
            token: null,
          };
        }

        const isValidPw = await user.comparePassword(password);
        console.log(isValidPw);

        if (isValidPw) {
          if (!user.verifiedPhoneNumber) {
            return {
              ok: false,
              error: "not_verified_phone",
              token: null
            };
          }

          const token = createJWT(user.id);

          return {
            ok: true,
            error: null,
            token,
          };
        } else {
          return {
            ok: false,
            error: "wrong_password",
            token: null,
          };
        }
      } catch (e) {
        return {
          ok: false,
          error: e.message,
          token: null,
        };
      }
    },
  },
};

export default resolvers;
