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

        const existingCredit = await Credit.findOne({
          number: args.number,
          company: args.company,
          cvv: args.cvv,
          expiringDate: args.expiringDate,
        });

        if (existingCredit) {
          return {
            ok: false,
            error: "card-existing",
          };
        } else {
          try {
            const newCredit = await Credit.create({
              user: user,
              ...args,
            }).save();

            if (!user.mainCredit) {
              user.mainCredit = newCredit;
              user.save();
            }

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
      }
    ),
  },
};

export default resolvers;
