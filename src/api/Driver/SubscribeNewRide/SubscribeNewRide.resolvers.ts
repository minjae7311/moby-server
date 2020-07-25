import { withFilter } from "graphql-yoga";
// import Driver from "../../../entities/Driver";

const resolvers = {
  Subscription: {
    Subscribing: {
      subscribe: withFilter(
        (_res, _args, { pubSub }) =>
          pubSub.asyncIterator(["rideRequesting", "driverLocationUpdating"]),
        async (payload, __args, { context }) => {
          console.log(payload);

          // const currentDriver: Driver = context.currentDriver;
          const {
            SubscribeNewRide: { from },
            SubscribeNewDriverLocation: { lat, lng },
          } = payload;

          // await currentDriver.reload();
          // const { lat, lng } = currentDriver;

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
