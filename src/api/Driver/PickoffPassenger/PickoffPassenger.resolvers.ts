import { Resolvers } from "../../../types/resolvers";
import {
  PickoffPassengerMutationArgs,
  PickoffPassengerResponse,
} from "../../../types/graph";
import Ride from "../../../entities/Ride";
import {
  requestPayment,
  cancelPayment,
} from "../../../utils/functions.payment";
import Payment from "../../../entities/Payment";
import driverPrivateResolver from "../../../utils/driverPrivateResolver";
import { sendPushAndroid } from "../../../utils/sendPushNotification";

const resolvers: Resolvers = {
  Mutation: {
    PickoffPassenger: driverPrivateResolver(
      async (
        _res,
        args: PickoffPassengerMutationArgs,
        { req, pubSub }
      ): Promise<PickoffPassengerResponse> => {
        const { driver } = req;

        try {
          const ride = await Ride.findOne(
            { id: args.rideId },
            { relations: ["driver", "passenger", "vehicle"] }
          );

          if (!ride) {
            return {
              ok: false,
              error: "ride-not-found",
              ride: null,
            };
          }

          if (ride.driver.id != driver.id) {
            return {
              ok: false,
              error: "not-driver-of-this-ride",
              ride: null,
            };
          }

          if (ride.status != "ONROUTE") {
            return {
              ok: false,
              error: "ride-is-not-onroute",
              ride: null,
            };
          }

          ride.status = "FINISHED";

          pubSub.publish("rideStatusUpdating", {
            SubscribeMyRide: ride,
          });

          ride.passenger.isRiding = false;
          ride.passenger.save();

          ride.driver.isDriving = false;
          ride.driver.save();

          const payment = await Payment.findOne(
            {
              ride,
              status: "PAYED",
            },
            { relations: ["credit"] }
          );

          const credit = payment!.credit;
          const cancelResult = await cancelPayment(payment!);
          const price = args.finalFee;

          if (cancelResult.ok) {
            const newPayment = await Payment.create({
              ride,
              price,
              credit,
            }).save();

            ride.finalFee = price;
            ride.finishedDate = String(new Date().getTime());
            ride.save();

            const paymentResult = await requestPayment(newPayment, "final");
            if (paymentResult.ok) {
              await sendPushAndroid(
                ride.passenger.pushToken,
                "탑승이 종료되었습니다..",
                "설문조사 하셨나요? 잊지말고 페이백 받으세요F",
                "Home"
              );

              return {
                ok: true,
                error: null,
                ride,
              };
            } else {
              return {
                ok: false,
                error: paymentResult.error,
                ride: null,
              };
            }
          } else {
            return {
              ok: false,
              error: cancelResult.error,
              ride: null,
            };
          }
        } catch (e) {
          return {
            ok: false,
            error: e.message,
            ride: null,
          };
        }
      }
    ),
  },
};

export default resolvers;
