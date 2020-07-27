import { Resolvers } from "../../../types/resolvers";
import privateResolver from "../../../utils/privateResolver";
import { requestPayment } from "../../../utils/request.payment";
import { StartPaymentResponse } from "../../../types/graph";
// import User from "../../../entities/User";

const resolvers: Resolvers = {
  Mutation: {
    StartPayment: privateResolver(
      async (_res, _args, { req }): Promise<StartPaymentResponse> => {
        const { user } = req;

        const result = await requestPayment(user);
        console.log("\n\n\n\nResult in StartPayment:", result, "\n\n\n\n\n");

        return {
          ok: false,
          error: null,
        };
      }
    ),
  },
};

export default resolvers;
