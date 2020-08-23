import { withFilter } from "graphql-yoga";
import { SubscribeNewRideSubscriptionArgs } from "../../../types/graph";

const resolvers = {
  Subscription: {
    SubscribeNewRide: {
      subscribe: withFilter(
        (_res, _args, { pubSub }) => pubSub.asyncIterator("assignNewRide"),
        async (
          payload,
          args: SubscribeNewRideSubscriptionArgs,
          { context }
        ) => {
          const {
            SubscribeNewRide: { driver },
          } = payload;

          console.log(driver, args.driverId);

          return driver.id === args.driverId;
        }
      ),
    },
  },
};

export default resolvers;
