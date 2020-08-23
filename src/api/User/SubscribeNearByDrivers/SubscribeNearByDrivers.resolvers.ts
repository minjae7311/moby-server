import { withFilter } from "graphql-yoga";
import { SubscribeNearByDriversSubscriptionArgs } from "../../../types/graph";
import { getDistance } from "../../../utils/getDistance";

const FIND_DRIVER_DISTANCE = 10;

const resolvers = {
  Subscription: {
    SubscribeNearByDrivers: {
      subscribe: withFilter(
        (_res, _args, { pubSub }) =>
          pubSub.asyncIterator("driverLocationUpdating"),
        async (
          payload,
          args: SubscribeNearByDriversSubscriptionArgs,
          _context
        ) => {
          const { lat: userLat, lng: userLng } = args;
          const {
            SubscribeNearByDrivers: { lat, lng },
          } = payload;

          const distance = getDistance(userLat, userLng, lat, lng);

          return distance <= FIND_DRIVER_DISTANCE;
        }
      ),
    },
  },
};

export default resolvers;
