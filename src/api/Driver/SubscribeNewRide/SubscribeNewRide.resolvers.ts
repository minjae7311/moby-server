import { withFilter } from "graphql-yoga";
import Driver from "../../../entities/Driver";

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

          return (
            from.lat >= lat - 0.05 &&
            from.lat <= lat + 0.05 &&
            from.lng >= lng - 0.05 &&
            from.lng <= lng + 0.05
          );
        }
      ),
    },
  },
};

export default resolvers;
