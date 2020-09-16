/** @format */

import { Resolvers } from "../../../types/resolvers";
import adminPrivateResolvers from "../../../utils/adminPrivateResolvers";
import {
  GetRideListQueryArgs,
  GetRideListResponse,
} from "../../../types/graph";
import Ride from "../../../entities/Ride";

const resolvers: Resolvers = {
  Query: {
    GetRideList: adminPrivateResolvers(
      async (
        _res,
        args: GetRideListQueryArgs,
        { req }
      ): Promise<GetRideListResponse> => {
        const { admin } = req;
        /**
         * @todo add order
         */
        const { take, page } = args;

        console.log(admin.id, "getting ride lists.");

        try {
          const rides = await Ride.find({
            skip: (page - 1) * take,
            take,
            relations: [
              "from",
              "to",
              "payment",
              "credit",
              "passenger",
              "driver",
              "vehicle",
            ],
          });

          console.log(rides);

          return {
            ok: true,
            error: null,
            rides,
          };
        } catch (e) {
          return {
            ok: false,
            error: e.message,
            rides: null,
          };
        }
      }
    ),
  },
};

export default resolvers;
