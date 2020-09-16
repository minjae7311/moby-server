import { Resolvers } from "../../../types/resolvers";
import privateResolver from "../../../utils/privateResolver";
import {
  DeleteCreditMutationArgs,
  DeleteCreditResponse,
} from "../../../types/graph";
import Credit from "../../../entities/Credit";

const resolvers: Resolvers = {
  Mutation: {
    DeleteCredit: privateResolver(
      async (
        _res,
        args: DeleteCreditMutationArgs,
        { req }
      ): Promise<DeleteCreditResponse> => {
        const { user } = req;
        const { creditId } = args;

        try {
          const credit = await Credit.findOne(
            { id: creditId },
            { relations: ["user"] }
          );

          if (!credit) {
            return {
              ok: false,
              error: "credit-not-found",
            };
          }

          if (credit.user.id != user.id) {
            return {
              ok: false,
              error: "un-auth-to-this-credit",
            };
          }

          await credit.remove();
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
