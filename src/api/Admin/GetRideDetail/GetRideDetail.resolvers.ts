/** @format */

import { Resolvers } from "../../../types/resolvers";
import adminPrivateResolvers from "../../../utils/adminPrivateResolvers";
import {
  GetRideDetailQueryArgs,
  GetRideDetailResponse,
} from "../../../types/graph";
import Ride from "../../../entities/Ride";

const resolvers: Resolvers = {
  Query: {
    GetRideDetail: adminPrivateResolvers(
      async (
        _req,
        args: GetRideDetailQueryArgs,
        { req }
      ): Promise<GetRideDetailResponse> => {
        const { id } = args;

        try {
          const ride = await Ride.findOne(
            { id },
            {
              relations: ["payment","driver","passenger","vehicle","vehicle.surveyForm","from","to"]
            }
          );

          if (ride) {
            return {
              ok: true,
              error: null,
              ride,
            };
          } else {
            return {
              ok: false,
              error: "ride-not-found",
              ride: null,
            };
          }
        } catch (e) {
          return {
            ok: false,
            error: e.message,
            ride: null,
          };
        }
      }
    ),
  },
};

export default resolvers;
