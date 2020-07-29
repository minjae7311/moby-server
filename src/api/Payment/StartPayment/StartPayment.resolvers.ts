import { Resolvers } from "../../../types/resolvers";
import privateResolver from "../../../utils/privateResolver";
import { requestPayment } from "../../../utils/functions.payment";
import { StartPaymentResponse } from "../../../types/graph";
// import User from "../../../entities/User";

const resolvers: Resolvers = {
  Mutation: {
    StartPayment: privateResolver(
      async (_res, _args, { req }): Promise<StartPaymentResponse> => {
        const { user } = req;

        await requestPayment(user);

        return {
          ok: false,
          error: null,
        };
      }
    ),
  },
};

export default resolvers;
