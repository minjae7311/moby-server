import { Resolvers } from "../../../types/resolvers";
import {
  AcceptRequestingRideMutationArgs,
  AcceptRequestingRideResponse,
} from "../../../types/graph";
import Driver from "../../../entities/Driver";
import Ride from "../../../entities/Ride";

const resolvers: Resolvers = {
  Mutation: {
    AcceptRequestingRide: async (
      _res,
      args: AcceptRequestingRideMutationArgs,
      { req, pubSub }
    ): Promise<AcceptRequestingRideResponse> => {
      /**
       * @todo 나중엔 드라이버를 토큰으로 가져오기.
       * @todo set vehicle
       */
      // const driver:Driver = req.user;
      const driver = await Driver.findOne(
        { id: 2 },
        { relations: ["vehicle"] }
      );
      const ride = await Ride.findOne(
        { id: args.rideId },
        { relations: ["passenger", "vehicle"] }
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

          console.log("\n\n\n\n\n", ride.vehicle, driver.vehicle);

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
