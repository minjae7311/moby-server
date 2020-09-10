/** @format */

import { Resolvers } from "../../../types/resolvers";
import adminPrivateResolvers from "../../../utils/adminPrivateResolvers";
import Driver from "../../../entities/Driver";
import {
  GetDriverListResponse,
  GetDriverListQueryArgs,
} from "../../../types/graph";

const resolvers: Resolvers = {
  Query: {
    GetDriverList: adminPrivateResolvers(
      async (
        _res,
        args: GetDriverListQueryArgs,
        { req }
      ): Promise<GetDriverListResponse> => {
        const { admin } = req;
        /**
         * @todo add order
         */
        const { take, page } = args;

        console.log(admin.id, "getting ride lists.");

        try {
          const drivers = await Driver.find({
            skip: (page - 1) * take,
            take,
            // relations: ["rides", "vehicle"],
          });

          return {
            ok: true,
            error: null,
            drivers,
          };
        } catch (e) {
          return {
            ok: false,
            error: e.message,
            drivers: null,
          };
        }
      }
    ),
  },
};

export default resolvers;
