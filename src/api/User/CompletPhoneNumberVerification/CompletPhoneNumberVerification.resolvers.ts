import { Resolvers } from "../../../types/resolvers";
import {
  CompletPhoneNumberVerificationResponse,
  CompletPhoneNumberVerificationMutationArgs,
} from "../../../types/graph";
import Verification from "../../../entities/Verification";
import createJWT from "../../../utils/create.JWT";
import User from "../../../entities/User";

const resolvers: Resolvers = {
  Mutation: {
    CompletPhoneNumberVerification: async (
      _,
      args: CompletPhoneNumberVerificationMutationArgs
    ): Promise<CompletPhoneNumberVerificationResponse> => {
      const { phoneNumber, key, deviceId } = args;

      try {
        // find verifications with phone number
        const verification = await Verification.findOne({
          payload: phoneNumber,
          key,
        });

        var userId;
        if (verification) {
          verification.verified = true;
          verification.save();

          if (verification.user !== undefined) {
            verification.user.deviceId = deviceId;
            verification.user.verifiedPhoneNumber = true;
            userId = verification.user.id;

            verification.user.save();
          } else {
            const newUser = await User.create({
              phoneNumber,
              verifiedPhoneNumber: true,
              deviceId,
              verification,
            }).save();

            verification.user = newUser;
            verification.save();

            userId = newUser.id;
          }

          const token = createJWT(userId, deviceId);

          return {
            ok: true,
            error: null,
            token,
          };
        } else {
          return {
            ok: false,
            error: "invalid-code",
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
