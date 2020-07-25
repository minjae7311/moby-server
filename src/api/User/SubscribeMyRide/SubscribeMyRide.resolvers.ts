import { withFilter } from "graphql-yoga";

const resolvers = {
  Subscription: {
    SubscribeMyRide: {
      subscribe: withFilter(
        (_res, _args, { pubSub }) => pubSub.asyncIterator("rideStatusUpdating"),
        async (payload, __args, { context }) => {
          const { currentUser } = context;

          const {
            SubscribeMyRide: { passenger /*driverId, status*/ },
          } = payload;

          console.log(payload);

          return passenger.id == currentUser.id;
        }
      ),
    },
  },
};

export default resolvers;
