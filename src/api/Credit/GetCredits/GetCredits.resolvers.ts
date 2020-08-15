import { Resolvers } from "../../../types/resolvers";
import privateResolver from "../../../utils/privateResolver";
import { GetCreditsResponse } from "../../../types/graph";

const resolvers: Resolvers = {
  Query: {
    GetCredits: privateResolver(
      async (_res, _args, { req }): Promise<GetCreditsResponse> => {
        const { user } = req;

        console.log(user.credit);

        if (user) {
          return {
            ok: true,
            error: null,
            credit: user.credit,
          };
        } else {
          return {
            ok: false,
            error: "user-not-found",
            credit: null,
          };
        }
      }
    ),
  },
};

export default resolvers;
