import { Resolvers } from "../../../types/resolvers";
import privateResolver from "../../../utils/privateResolver";
import User from "../../../entities/User";
import {
  EnrollCreditResponse,
  EnrollCreditMutationArgs,
} from "../../../types/graph";
import Credit from "../../../entities/Credit";

const resolvers: Resolvers = {
  Mutation: {
    EnrollCredit: privateResolver(
      async (
        _res,
        args: EnrollCreditMutationArgs,
        { req }
      ): Promise<EnrollCreditResponse> => {
        const user: User = req.user;

        try {
          await Credit.create({
            user: user,
            ...args,
          }).save();

          console.log("\n\n\n\n\nUser's credit:::",user.credit);

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
