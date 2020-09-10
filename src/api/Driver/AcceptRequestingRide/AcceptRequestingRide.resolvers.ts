import { Resolvers } from "../../../types/resolvers";
import {
  AcceptRequestingRideMutationArgs,
  AcceptRequestingRideResponse,
} from "../../../types/graph";
import Ride from "../../../entities/Ride";
import { getDistance } from "../../../utils/getDistance";
import Payment from "../../../entities/Payment";
import { requestPayment } from "../../../utils/functions.payment";
import driverPrivateResolver from "../../../utils/driverPrivateResolver";
import { sendPushAndroid } from "../../../utils/sendPushNotification";

const resolvers: Resolvers = {
  Mutation: {
    AcceptRequestingRide: driverPrivateResolver(
      async (
        _res,
        args: AcceptRequestingRideMutationArgs,
        { req, pubSub }
      ): Promise<AcceptRequestingRideResponse> => {
        const { driver } = req;

        if (driver.isDriving) {
          return { ok: false, error: "already-driving" };
        }

        if (!driver.workingOn) {
          return { ok: false, error: "not-working-now" };
        }

        try {
          const ride = await Ride.findOne(
            { id: args.rideId },
            { relations: ["passenger", "vehicle", "from", "driver", "credit"] }
          );

          if (!ride) {
            return { ok: false, error: "ride-not-found" };
          }

          if (ride.status != "REQUESTING") {
            return { ok: false, error: "ride-is-not-requesting" };
          }

          if (ride.driver.id != driver.id) {
            return { ok: false, error: "not-driver-of-this-ride" };
          }

          ride.status = "ACCEPTED";
          ride.acceptedDate = String(new Date().getTime();
          ride.distanceBetween = getDistance(
            ride.from.lat,
            ride.from.lng,
            ride.driver.lat,
            ride.driver.lng
          );

          pubSub.publish("rideStatusUpdating", {
            SubscribeMyRide: ride,
          });

          const newPayment = await Payment.create({
            ride,
            price: ride.expectingFee,
            credit: ride.credit,
          }).save();

          const paymentResult = await requestPayment(newPayment, "initial");

          if (paymentResult.ok) {
            await ride.save();

            driver.isDriving = true;
            driver.save();

            console.log("SENDING!");
            await sendPushAndroid(
              ride.passenger.pushToken,
              "기사가 이동 중입니다.",
              "기사가 이동하고 있어요바디",
              "ComingDriver"
            );

            return {
              ok: true,
              error: null,
            };
          } else {
            return {
              ok: false,
              error: paymentResult.error,
            };
          }
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
