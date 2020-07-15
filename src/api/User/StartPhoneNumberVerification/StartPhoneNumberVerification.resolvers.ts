import { Resolvers } from "../../../types/resolvers";
import {
  StartPhoneNumberVerificationResponse,
  StartPhoneNumberVerificationMutationArgs,
} from "../../../types/graph";
import Verification from "../../../entities/Verification";
import { sendVerificationSMS } from "../../../utils/sendSMS";
// import createJWT from "../../../utils/create.JWT";

const resolvers: Resolvers = {
  Mutation: {
    StartPhoneNumberVerification: async (
      _,
      args: StartPhoneNumberVerificationMutationArgs
    ): Promise<StartPhoneNumberVerificationResponse> => {
      const { phoneNumber } = args;

      try {
        const existingVerifications = await Verification.find({
          payload: phoneNumber,
        });

        if (existingVerifications) {
          existingVerifications.forEach(async (verification) => {
            if (!verification.verified) {
              await verification.remove();
            }
          });
        }

        const newVerification = await Verification.create({
          payload: phoneNumber,
          target: "PHONE",
        }).save();

        await sendVerificationSMS(newVerification.payload, newVerification.key);

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
    },
  },
};

export default resolvers;
