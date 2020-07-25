import { Resolvers } from "../../../types/resolvers";
import {
  PickoffPassengerMutationArgs,
  PickoffPassengerResponse,
} from "../../../types/graph";
import Ride from "../../../entities/Ride";

const resolvers: Resolvers = {
  Mutation: {
    PickoffPassenger: async (
      _res,
      args: PickoffPassengerMutationArgs,
      { req, pubSub }
    ): Promise<PickoffPassengerResponse> => {
      /**
       * @todo 나중엔 드라이버를 토큰으로 가져오기.
       */
      // const driver:Driver = req.user;

      const ride = await Ride.findOne(
        { id: args.rideId },
        { relations: ["passenger" /* , "driver" */] }
      );

      if (!ride) {
        return {
          ok: false,
          error: "ride-not-found",
        };
      }

      if (ride.status != "ONROUTE") {
        return {
          ok: false,
          error: "ride-is-not-onroute",
        };
      } else {
        try {
          ride.status = "FINISHED";

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
