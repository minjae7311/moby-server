import { Resolvers } from "../../../types/resolvers";
import privateResolver from "../../../utils/privateResolver";
import { requestPayment } from "../../../utils/request.payment";
// import User from "../../../entities/User";

const resolvers: Resolvers = {
  Mutation: {
    StartPayment: privateResolver(async (_res, _args, { req }) => {
      const { user } = req;

      const ret = await requestPayment(user);

      return {
        ok: false,
        error: ret,
      };
    }),
  },
};

export default resolvers;
