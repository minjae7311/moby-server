import { Resolvers } from "../../../types/resolvers";
import Ride from "../../../entities/Ride";
import {
  PickupPassengerResponse,
  PickupPassengerMutationArgs,
} from "../../../types/graph";
import driverPrivateResolver from "../../../utils/driverPrivateResolver";
import { sendPushAndroid } from "../../../utils/sendPushNotification";

const resolvers: Resolvers = {
  Mutation: {
    PickupPassenger: driverPrivateResolver(
      async (
        _res,
        args: PickupPassengerMutationArgs,
        { req, pubSub }
      ): Promise<PickupPassengerResponse> => {
        const { driver } = req;

        try {
          const ride = await Ride.findOne(
            { id: args.rideId },
            {
              relations: [
                "driver",
                "passenger",
                "vehicle",
                "vehicle.surveyForm",
              ],
            }
          );

          if (!ride) {
            return {
              ok: false,
              error: "ride-not-found",
            };
          }

          if (ride.driver.id != driver.id) {
            return {
              ok: false,
              error: "not-driver-of-this-ride",
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

          await sendPushAndroid(
            ride.passenger.pushToken,
            "탑승했습니다.",
            "즐거운 여행되세요 바디F",
            "OnTheWay"
          );

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
    ),
  },
};

export default resolvers;
