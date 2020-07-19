import { Resolvers } from "../../../types/resolvers";
import {
  CompletPhoneNumberVerificationResponse,
  CompletPhoneNumberVerificationMutationArgs,
} from "../../../types/graph";
import Verification from "../../../entities/Verification";
import createJWT from "../../../utils/create.JWT";
import User from "../../../entities/User";
import { getRepository } from "typeorm";

const resolvers: Resolvers = {
  Mutation: {
    CompletPhoneNumberVerification: async (
      _,
      args: CompletPhoneNumberVerificationMutationArgs
    ): Promise<CompletPhoneNumberVerificationResponse> => {
      const { phoneNumber, key, deviceId } = args;

      try {
        // find verifications with phone number
        const verification = await getRepository(Verification).findOne(
          {
            payload: phoneNumber,
            key,
          },
          { relations: ["user"] }
        );

        // valid key
        if (verification) {

          // user exists
          if (verification.user) {
            verification.user.deviceId = deviceId;
            verification.user.verifiedPhoneNumber = true;

            await verification.user.save();

            const token = createJWT(verification.user.id, deviceId);

            return {
              ok: true,
              error: null,
              token,
            };
          } else { // new user
            const newUser = await User.create({
              phoneNumber,
              verifiedPhoneNumber: true,
              deviceId,
              verification,
            }).save();

            verification.verified = true;
            verification.user = newUser;
            await verification.save();

            const token = createJWT(newUser.id, deviceId);

            return {
              ok: true,
              error: null,
              token,
            };
          }
        } else { // invalid key
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
