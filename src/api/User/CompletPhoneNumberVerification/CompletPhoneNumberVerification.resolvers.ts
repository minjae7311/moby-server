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

        if (verification) {
          if (verification.user) {
            console.log("\n\n\n\n", verification, verification.user);
            verification.user.deviceId = deviceId;
            verification.user.verifiedPhoneNumber = true;

            verification.user.save();

            const token = createJWT(verification.user.id, deviceId);

            return {
              ok: true,
              error: null,
              token,
            };
          } else {
            const newUser = await User.create({
              phoneNumber,
              verifiedPhoneNumber: true,
              deviceId,
              verification,
            }).save();

            verification.verified = true;
            verification.user = newUser;
            verification.save();

            const token = createJWT(newUser.id, deviceId);

            return {
              ok: true,
              error: null,
              token,
            };
          }
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
