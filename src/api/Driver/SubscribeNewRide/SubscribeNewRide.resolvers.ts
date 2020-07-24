import { withFilter } from "graphql-yoga";
// import Driver from "../../../entities/Driver";

const resolvers = {
  Subscription: {
    SubscribeNewRide: {
      subscribe: withFilter(
        (_res, _args, { pubSub }) => pubSub.asyncIterator("rideRequesting"),
        (payload, __args, { context }) => {
          /**
           * @todo
           */
          const { currentDriver } = context;
          console.log(currentDriver);
          const {
            SubscribeNewRide: { from },
          } = payload;
          console.log(from);

          return true;
          //   const { lat, lng } = currentDriver;
        }
      ),
    },
  },
};

export default resolvers;
