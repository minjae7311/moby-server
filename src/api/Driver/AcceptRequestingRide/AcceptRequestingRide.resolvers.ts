import { Resolvers } from "../../../types/resolvers";
import {
  AcceptRequestingRideMutationArgs,
  AcceptRequestingRideResponse,
} from "../../../types/graph";
import Driver from "../../../entities/Driver";
import Ride from "../../../entities/Ride";
import { getDistance } from "../../../utils/getDistance";

const resolvers: Resolvers = {
  Mutation: {
    AcceptRequestingRide: async (
      _res,
      args: AcceptRequestingRideMutationArgs,
      { req, pubSub }
    ): Promise<AcceptRequestingRideResponse> => {
      /**
       * @todo 나중엔 드라이버를 토큰으로 가져오기.
       */
      // const driver:Driver = req.user;
      const driver = await Driver.findOne(
        { id: 5 },
        { relations: ["vehicle"] }
      );

      const ride = await Ride.findOne(
        { id: args.rideId },
        {
          relations: ["passenger", "vehicle", "from", "driver"],
        }
      );

      if (!ride) {
        return {
          ok: false,
          error: "ride-not-found",
        };
      }

      if (!driver) {
        return {
          ok: false,
          error: "driver-not-found",
        };
      }

      if (ride.status != "REQUESTING") {
        return {
          ok: false,
          error: "ride-is-not-requesting",
        };
      } else {
        try {
          ride.driver = driver;
          ride.status = "ACCEPTED";
          ride.vehicle = driver.vehicle;
          ride.acceptedDate = new Date().toLocaleString();
          ride.distanceBetween = getDistance(
            ride.from.lat,
            ride.from.lng,
            ride.driver.lat,
            ride.driver.lng
          );

          pubSub.publish("rideStatusUpdating", {
            SubscribeMyRide: ride,
          });

          await ride.save();

          return {
            ok: true,
            error: null,
          };
        } catch (e) {
          return {
            ok: false,
            error: e.message,
          };
        }
      }
    },
  },
};

export default resolvers;
