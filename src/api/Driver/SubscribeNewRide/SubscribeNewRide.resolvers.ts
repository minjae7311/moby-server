import { withFilter } from "graphql-yoga";
// import Driver from "../../../entities/Driver";

const resolvers = {
  Subscription: {
    SubscribeNewRide: {
      subscribe: withFilter(
        (_res, _args, { pubSub }) => pubSub.asyncIterator("rideRequesting"),
        (payload, __args, { context }) => {
          const { currentDriver } = context;
          console.log(currentDriver);
          const {
            SubscribeNewRide: { from },
          } = payload;
          console.log(from);
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
