import { Resolvers } from "../../../types/resolvers";
import privateResolver from "../../../utils/privateResolver";
import { readyPayment } from "../../../utils/ready.payment";

const resolvers: Resolvers = {
  Mutation: {
    StartPayment: privateResolver(async (_res, _args, { req }) => {
      // const { user } = req.user;
      // const { credit } = user.mainCredit;

      const ret = await readyPayment();

      return {
        ok: false,
        error: ret,
      };
    }),
  },
};

export default resolvers;
