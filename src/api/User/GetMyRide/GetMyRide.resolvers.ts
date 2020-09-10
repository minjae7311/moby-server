import { Resolvers } from "../../../types/resolvers";
import privateResolver from "../../../utils/privateResolver";
import { GetMyRideResponse } from "../../../types/graph";
import Ride from "../../../entities/Ride";

const resolvers: Resolvers = {
  Query: {
    GetMyRide: privateResolver(
      async (_res, _args, { req }): Promise<GetMyRideResponse> => {
        const { user } = req;

        try {
          const ride = await Ride.findOne(
            {
              passenger: user,
              status: "REQUESTING",
            },
            { relations: ["from", "to"], order: { updatedAt: "DESC" } }
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
