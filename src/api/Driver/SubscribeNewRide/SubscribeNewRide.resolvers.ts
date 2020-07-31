import { withFilter } from "graphql-yoga";
import Driver from "../../../entities/Driver";
import { getDistance } from "../../../utils/getDistance";

const resolvers = {
  Subscription: {
    SubscribeNewRide: {
      subscribe: withFilter(
        (_res, _args, { pubSub }) => pubSub.asyncIterator("rideRequesting"),
        async (payload, __args, { context }) => {
          const currentDriver: Driver = context.currentDriver;
          const {
            SubscribeNewRide: { from },
          } = payload;

          await currentDriver.reload();
          const { lat, lng } = currentDriver;

          const distance = getDistance(from.lat, from.lng, lat, lng);

          return distance <= 10;
        }
      ),
    },
  },
};

export default resolvers;
