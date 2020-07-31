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

          /**
           * @todo
           * // 구면 코사인 법칙(Spherical Law of Cosine) 으로 두 위도/경도 지점의 거리를 구함
// 반환 거리 단위 (km)
function computeDistance(startCoords, destCoords) {
    var startLatRads = degreesToRadians(startCoords.latitude);
    var startLongRads = degreesToRadians(startCoords.longitude);
    var destLatRads = degreesToRadians(destCoords.latitude);
    var destLongRads = degreesToRadians(destCoords.longitude);

    var Radius = 6371; //지구의 반경(km)
    var distance = Math.acos(Math.sin(startLatRads) * Math.sin(destLatRads) + 
                    Math.cos(startLatRads) * Math.cos(destLatRads) *
                    Math.cos(startLongRads - destLongRads)) * Radius;

    return distance;
}

function degreesToRadians(degrees) {
    radians = (degrees * Math.PI)/180;
    return radians;
}

           */

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
