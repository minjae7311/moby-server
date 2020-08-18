import { Resolvers } from "../../../types/resolvers";
import privateResolver from "../../../utils/privateResolver";
import {
  SetMainCreditMutationArgs,
  SetMainCreditResponse,
} from "../../../types/graph";
import Credit from "../../../entities/Credit";

const resolvers: Resolvers = {
  Mutation: {
    SetMainCredit: privateResolver(
      async (
        _res,
        args: SetMainCreditMutationArgs,
        { req }
      ): Promise<SetMainCreditResponse> => {
        const { user } = req;

        try {
          const credit = await Credit.findOne({
            id: args.creditId,
          });

          if (!credit) {
            return {
              ok: false,
              error: "credit-not-found",
            };
          }

          const creditList = user.credit;
          creditList.forEach((credit) => {
            if (credit.isMain == true) {
              credit.isMain = false;
              credit.save();
            }
          });

          credit.isMain = true;
          await credit.save();

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
      }
    ),
  },
};

export default resolvers;
