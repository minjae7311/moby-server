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
        { relations: ["passenger" /* , "driver" */] }
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

          const payment = await Payment.findOne(
            {
              ride,
              isCancelled: false,
            },
            { relations: ["credit"] }
          );

          console.log("\n\n\n\n\n\n", payment);

          const credit = payment!.credit;
          await cancelPayment(payment!);

          const newPayment = await Payment.create({
            ride,
            price: args.finalFee,
            credit,
          });

          const paymentResult = await requestPayment(newPayment, "final");
          if (paymentResult.ok) {
            ride.save();

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
