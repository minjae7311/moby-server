import { withFilter } from "graphql-yoga";

const resolvers = {
  Subscription: {
    SubscribeMyRide: {
      subscribe: withFilter(
        (_res, _args, { pubSub }) => pubSub.asyncIterator("rideStatusUpdating"),
        async (payload, __args, { context }) => {
          /**
           * @todo 현재 요청한 라이드를 특정할 더 효과적인 방법?
           */
          const { currentUser } = context;

          const {
            SubscribeMyRide: { passenger /*driverId, status*/ },
          } = payload;

          return passenger.id == currentUser.id;
        }
      ),
    },
  },
};

export default resolvers;
