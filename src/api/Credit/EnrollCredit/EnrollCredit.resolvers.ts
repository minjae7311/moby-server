import { Resolvers } from "../../../types/resolvers";
import privateResolver from "../../../utils/privateResolver";
import User from "../../../entities/User";
import {
  EnrollCreditResponse,
  EnrollCreditMutationArgs,
} from "../../../types/graph";
import Credit from "../../../entities/Credit";
import { verifyCredit } from "../../../utils/functions.payment";
import cleanNullArgs from "../../../utils/cleanNullArg";

const resolvers: Resolvers = {
  Mutation: {
    EnrollCredit: privateResolver(
      async (
        _res,
        args: EnrollCreditMutationArgs,
        { req }
      ): Promise<EnrollCreditResponse> => {
        const user: User = req.user;

        const { card_number, expiry } = args;

        const existingCredit = await Credit.findOne({
          card_number,
          expiry,
        });

        if (existingCredit) {
          return {
            ok: false,
            error: "card-existing",
          };
        } else {
          try {
            const notNullArgs = cleanNullArgs(args);
            const newCredit = await Credit.create({
              user: user,
              ...notNullArgs,
            });

            const verifyCreditResult = await verifyCredit(newCredit);
            if (verifyCreditResult.ok && verifyCreditResult.credit) {

              return {
                ok: true,
                error: null,
              };
            } else {
              return {
                ok: false,
                error: verifyCreditResult.error,
              };
            }
          } catch (e) {
            return {
              ok: false,
              error: e.message,
            };
          }
        }
      }
    ),
  },
};

export default resolvers;
