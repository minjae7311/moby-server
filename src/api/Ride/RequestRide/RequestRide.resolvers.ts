import { Resolvers } from "../../../types/resolvers";
import privateResolver from "../../../utils/privateResolver";
import {
  RequestRideResponse,
  RequestRideMutationArgs,
} from "../../../types/graph";
import Ride from "../../../entities/Ride";
import Place from "../../../entities/Place";

const resolvers: Resolvers = {
  Mutation: {
    RequestRide: privateResolver(
      async (
        _res,
        args: RequestRideMutationArgs,
        { req }
      ): Promise<RequestRideResponse> => {
        const { user } = req;

        const from = await Place.findOne({ id: args.from.id });
        const to = await Place.findOne({ id: args.to.id });

        const newRide = await Ride.create({
          ...args,
          from,
          to,
          passenger: user,
        }).save();

        console.log(newRide);
        newRide.payment = [];
        newRide.discount = [];
        newRide.finalFee = 0;

        return {
          ok: true,
          error: null,
          ride: null,
        };
      }
    ),
  },
};

export default resolvers;