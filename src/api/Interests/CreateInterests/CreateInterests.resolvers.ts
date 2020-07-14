import { Resolvers } from "../../../types/resolvers";
import {
  CreateInterestsMutationArgs,
  CreateInterestsResponse,
} from "../../../types/graph";
import Interests from "../../../entities/Interests";

const resolvers: Resolvers = {
  Mutation: {
    CreateInterests: async (
      _,
      args: CreateInterestsMutationArgs
    ): Promise<CreateInterestsResponse> => {
      try {
        const newInterest = await Interests.create({ ...args }).save();

        if (newInterest) {
          return {
            ok: true,
            error: null,
          };
        } else {
          return {
            ok: false,
            error: "Fail to create Interest",
          };
        }
      } catch (e) {
        return {
          ok: false,
          error: e.message,
        };
      }
    },
  },
};

export default resolvers;
