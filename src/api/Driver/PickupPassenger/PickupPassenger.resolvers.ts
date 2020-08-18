import { Resolvers } from "../../../types/resolvers";
import Ride from "../../../entities/Ride";
import {
  PickupPassengerResponse,
  PickupPassengerMutationArgs,
} from "../../../types/graph";

const resolvers: Resolvers = {
  Mutation: {
    PickupPassenger: async (
      _res,
      args: PickupPassengerMutationArgs,
      { req, pubSub }
    ): Promise<PickupPassengerResponse> => {
      /**
       * @todo 나중엔 드라이버를 토큰으로 가져오기.
       */
      // const driver: Driver = req.user;

      try {
        const ride = await Ride.findOne(
          { id: args.rideId },
          {
            relations: ["passenger", "vehicle", "vehicle.surveyForm"],
          }
        );

        if (!ride) {
          return {
            ok: false,
            error: "ride-not-found",
          };
        }

        if (ride.status != "ACCEPTED") {
          return {
            ok: false,
            error: "ride-is-not-accepted",
          };
        }

        ride.status = "ONROUTE";

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
    },
  },
};

export default resolvers;
