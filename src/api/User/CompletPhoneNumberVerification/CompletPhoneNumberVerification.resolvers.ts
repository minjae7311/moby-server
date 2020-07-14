import { Resolvers } from "../../../types/resolvers";
import {
  CompletPhoneNumberVerificationResponse,
  CompletPhoneNumberVerificationMutationArgs,
} from "../../../types/graph";
import Verification from "../../../entities/Verification";
import User from "../../../entities/User";
import createJWT from "../../../utils/create.JWT";

const resolvers: Resolvers = {
  Mutation: {
    CompletPhoneNumberVerification: async (
      _,
      args: CompletPhoneNumberVerificationMutationArgs
    ): Promise<CompletPhoneNumberVerificationResponse> => {
      const { phoneNumber, key } = args;

      try {
        // find verification with phone number
        const verification = await Verification.findOne({
          payload: phoneNumber,
          key,
        });

        // if verification already verified
        if (verification) {
          const user = await User.findOne({ phoneNumber });
          const token = createJWT(user!.id);

          if (verification.verified) {
            return {
              ok: false,
              error: "verified_already",
              token,
            };
          } else {
            verification.verified = true;
            verification.save();

            user!.verifiedPhoneNumber = true;
            user!.save();

            return {
              ok: true,
              error: null,
              token,
            };
          }
        } else {
          return {
            ok: false,
            error: "verification_not_found",
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
