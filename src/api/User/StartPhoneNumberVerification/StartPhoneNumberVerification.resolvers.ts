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
        const existingVerification = await Verification.findOne(
          {
            payload: phoneNumber,
          },
          { relations: ["user"] }
        );

        const newVerification = await Verification.create({
          payload: phoneNumber,
          target: "PHONE",
        }).save();

        if (existingVerification) {
          if (existingVerification.user) {
            newVerification.user = existingVerification.user;
            /**
             * @todo not need to save old verification??
             * make "OldVerifications" table?
             */
            await existingVerification.remove();
            await newVerification.save();
          }
        }

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
