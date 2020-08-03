import { withFilter } from "graphql-yoga";
import Driver from "../../../entities/Driver";
import { getDistance } from "../../../utils/getDistance";
import { SubscribeNewRideSubscriptionArgs } from "../../../types/graph";

const resolvers = {
  Subscription: {
    SubscribeNewRide: {
      subscribe: withFilter(
        (_res, _args, { pubSub }) => pubSub.asyncIterator("rideRequesting"),
        async (
          payload,
          args: SubscribeNewRideSubscriptionArgs,
          { context }
        ) => {
          const currentDriver: Driver = context.currentDriver;
          const { FindingDistance } = args;
          const {
            SubscribeNewRide: { from },
          } = payload;

          await currentDriver.reload();
          const { lat, lng } = currentDriver;
          const cur_distance = getDistance(from.lat, from.lng, lat, lng);

          return cur_distance <= FindingDistance;
        }
      ),
    },
  },
};

export default resolvers;
