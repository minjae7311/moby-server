import { Resolvers } from "../../../types/resolvers";
import Interests from "../../../entities/Interests";
import { GetAllInterestsResponse } from "../../../types/graph";

const resolvers: Resolvers = {
  Query: {
    GetAllInterests: async (
      _res,
      _args,
      _
    ): Promise<GetAllInterestsResponse> => {
      try {
        const interests = await Interests.find();

        return {
          ok: true,
          error: null,
          interests,
        };
      } catch (e) {
        return {
          ok: false,
          error: e.message,
          interests: null,
        };
      }
    },
  },
};

export default resolvers;
