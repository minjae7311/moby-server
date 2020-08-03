import { withFilter } from "graphql-yoga";
import Driver from "../../../entities/Driver";
import { getDistance } from "../../../utils/getDistance";

const resolvers = {
  Subscription: {
    SubscribeNewRide: {
      subscribe: withFilter(
        (_res, _args, { pubSub }) => pubSub.asyncIterator("rideRequesting"),
        async (payload, _args, { context }) => {
          const currentDriver: Driver = context.currentDriver;
          const {
            SubscribeNewRide: { from, findingDistance },
          } = payload;

          await currentDriver.reload();
          const { lat, lng } = currentDriver;
          const cur_distance = getDistance(from.lat, from.lng, lat, lng);

          return cur_distance <= findingDistance;
        }
      ),
    },
  },
};

export default resolvers;
