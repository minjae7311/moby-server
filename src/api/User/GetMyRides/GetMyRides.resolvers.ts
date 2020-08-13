import { Resolvers } from "../../../types/resolvers";
import privateResolver from "../../../utils/privateResolver";
import { GetMyRidesResponse } from "../../../types/graph";
import Ride from "../../../entities/Ride";

const resolvers: Resolvers = {
  Query: {
    GetMyRides: privateResolver(
      async (_res, _args, { req }): Promise<GetMyRidesResponse> => {
        const { user } = req;

        try {
          const rides = await Ride.find({
            passenger: user,
          });

          if (rides.length > 0) {
            return {
              ok: true,
              error: null,
              rides,
            };
          } else {
            return {
              ok: false,
              error: "rides-not-found",
              rides: null,
            };
          }
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
