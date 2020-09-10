import { Resolvers } from "../../../types/resolvers";
import adminPrivateResolvers from "../../../utils/adminPrivateResolvers";
import {
  GetDriverDetailQueryArgs,
  GetDriverDetailResponse,
} from "../../../types/graph";
import Driver from "../../../entities/Driver";

const resolvers: Resolvers = {
  Query: {
    GetDriverDetail: adminPrivateResolvers(
      async (
        _res,
        args: GetDriverDetailQueryArgs,
        { req }
      ): Promise<GetDriverDetailResponse> => {
        const { id } = args;

        try {
          const driver = await Driver.findOne(
            { id },
            { relations: ["rides", "vehicle"] }
          );

          if (!driver) {
            return {
              ok: false,
              error: "not-found",
              driver: null,
            };
          }

          return {
            ok: true,
            error: null,
            driver,
          };
        } catch (e) {
          return {
            ok: false,
            error: e.meesage,
            driver: null,
          };
        }
      }
    ),
  },
};

export default resolvers;
