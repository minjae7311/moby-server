import { Resolvers } from "../../../types/resolvers";
import privateResolver from "../../../utils/privateResolver";
import {
  UpdateInterestsMutationArgs,
  UpdateInterestsResponse,
} from "../../../types/graph";
import Interests from "../../../entities/Interests";
import { In } from "typeorm";

const resolvers: Resolvers = {
  Mutation: {
    UpdateInterests: privateResolver(
      async (
        _res,
        args: UpdateInterestsMutationArgs,
        { req }
      ): Promise<UpdateInterestsResponse> => {
        // Here, we do not get interests of user.
        const { user } = req;

        try {
          const { interestIds } = args;

          const interests = await Interests.find({
            where: { id: In(interestIds) },
          });

          // Rewrite interests.
          user.interests = interests;
          await user.save();

          console.log(user);
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
