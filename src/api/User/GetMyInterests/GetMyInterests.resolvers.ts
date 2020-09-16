import { Resolvers } from "../../../types/resolvers";
import privateResolver from "../../../utils/privateResolver";
import { GetMyInterestsResponse } from "../../../types/graph";
import User from "../../../entities/User";

const resolvers: Resolvers = {
  Query: {
    GetMyInterests: privateResolver(
      async (_res, _args, { req }): Promise<GetMyInterestsResponse> => {
        const { user } = req;

        try {
          const currentUser = await User.findOne(
            { id: user.id },
            { relations: ["interests"] }
          );

          if (!currentUser)
            return {
              ok: false,
              error: "user-not-found",
              interests: null,
            };

          return {
            ok: true,
            error: null,
            interests: currentUser?.interests,
          };
        } catch (e) {
          return {
            ok: false,
            error: e.message,
            interests: null,
          };
        }
      }
    ),
  },
};

export default resolvers;
