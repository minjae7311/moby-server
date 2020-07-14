import { SignUpResponse, SignUpMutationArgs } from "../../../types/graph";
import User from "../../../entities/User";
import { Resolvers } from "../../../types/resolvers";
import Verification from "../../../entities/Verification";
import { sendVerificationSMS } from "../../../utils/sendSMS";
import createJWT from "../../../utils/create.JWT";

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

          const phoneVerification = await Verification.create({
            payload: args.phoneNumber,
            target: "PHONE",
          }).save();

          await sendVerificationSMS(newUser.fullName, phoneVerification.key);

          const token = createJWT(newUser.id);

          return {
            ok: true,
            error: null,
            token,
          };
        }
        // user exist
        else {
          /**
           * @todo is this right to create token?
           */
          const token = createJWT(existingUser.id);
          // phone verified
          if (existingUser.verifiedPhoneNumber) {
            // login
            return {
              ok: false,
              error: "login",
              token,
            };
          } else {
            // start phone verification

            const phoneVerification = await Verification.create({
              payload: args.phoneNumber,
              target: "PHONE",
            }).save();

            await sendVerificationSMS(
              existingUser.fullName,
              phoneVerification.key
            );

            const token = createJWT(existingUser.id);

            return {
              ok: true,
              error: null,
              token,
            };
          }
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
