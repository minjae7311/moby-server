import { Resolvers } from "../../../types/resolvers";
import privateResolver from "../../../utils/privateResolver";

const resolvers: Resolvers = {
  Mutation: {
    StartPayment: privateResolver(async (_res, _args, { req }) => {
      const { user } = req.user;
      const { credit } = user.mainCredit;
      
      

    }),
  },
};

export default resolvers;
