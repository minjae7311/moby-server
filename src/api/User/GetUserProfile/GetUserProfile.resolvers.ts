import { Resolvers } from "../../../types/resolvers";
import privateResolver from "../../../utils/privateResolver";

const resolvers: Resolvers = {
  Query: {
    GetUserProfile: privateResolver(async (_res, _args, { req }) => {
      const { user } = req;

      if (user) {
        return {
          ok: true,
          error: null,
          user,
        };
      } else {
        return {
          ok: true,
          error: "user-not-found",
          user: null,
        };
      }
    }),
  },
};

export default resolvers;