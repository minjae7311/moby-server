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
        const verifications = await Verification.find({
          payload: phoneNumber,
          // key,
        });

        var verified = false;
        var userId;
        verifications.forEach(async (verification) => {
          if (verification.key == key) {
            verified = true;

            verification.verified = true;
            verification.save();

            if (verification.user) {
              verification.user.deviceId = deviceId;
              verification.user.verifiedPhoneNumber = true;
              userId = verification.user.id;

              await verification.user.save();
            } else {
              const newUser = await User.create({
                phoneNumber,
                verifiedPhoneNumber: true,
                deviceId,
              }).save();

              userId = newUser.id;
            }
          } else {
            await verification.remove();
          }
        });

        if (verified) {
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
