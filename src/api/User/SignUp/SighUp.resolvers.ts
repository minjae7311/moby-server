import { SignUpResponse, SignUpMutationArgs } from "../../../types/graph";
import User from "../../../entities/User";
import { Resolvers } from "../../../types/resolvers";

const resolvers: Resolvers = {
  Mutation: {
    SignUp: async (_, args: SignUpMutationArgs): Promise<SignUpResponse> => {
      try {
        const { phoneNumber } = args;

        // find user
        const existingUser = await User.findOne({ phoneNumber });

        // new user
        if (!existingUser) {
          const newUser = await User.create({ ...args }).save();
        }
        // user exist
        else {
          // phone verified
          if (existingUser.verifiedPhoneNumber) {
            // login
            return {
              ok: false,
              error: "login",
            };
          } else {
            // start phone verification
            return {
              ok: false,
              error: "verify",
            };
          }
        }
      } catch (e) {
        return {
          ok: false,
          error: e.message,
          token: null
        };
      }
    },
  },
};

export default resolvers;
