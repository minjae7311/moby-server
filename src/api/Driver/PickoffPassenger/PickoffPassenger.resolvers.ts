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
        { relations: ["passenger", "vehicle", "driver"] }
      );

      if (!ride) {
        return {
          ok: false,
          error: "ride-not-found",
          ride: null,
        };
      }

      if (ride.status != "ONROUTE") {
        return {
          ok: false,
          error: "ride-is-not-onroute",
          ride: null,
        };
      } else {
        try {
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
            ride.finishedDate = new Date().toLocaleString();
            ride.save();

            const paymentResult = await requestPayment(newPayment, "final");
            if (paymentResult.ok) {
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
    },
  },
};

export default resolvers;
