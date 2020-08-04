import { Resolvers } from "../../../types/resolvers";
import privateResolver from "../../../utils/privateResolver";
import { CancelMyRideResponse } from "../../../types/graph";
import Ride from "../../../entities/Ride";
import { cancelPayment } from "../../../utils/functions.payment";

const resolvers: Resolvers = {
  Mutation: {
    CancelMyRide: privateResolver(
      async (_res, _args, { req, pubSub }): Promise<CancelMyRideResponse> => {
        const { user } = req;
        try {
          const ride = await Ride.findOne(
            {
              passenger: user,
              status: "REQUESTING",
            },
            {
              relations: ["payment", "payment.credit"],
              order: { updatedAt: "DESC" },
            }
          );

          if (ride) {
            ride.status = "CANCELED";

            pubSub.publish("rideStatusUpdating", {
              SubscribeMyRide: ride,
            });

            ride.save();

            const cancelResult = await cancelPayment(ride.payment[0]);

            user.isRiding = false;
            await user.save();

            if (cancelResult.ok) {
              return {
                ok: true,
                error: null,
              };
            } else {
              return {
                ok: false,
                error: "payment-cancel-failed",
              };
            }
          } else {
            return {
              ok: false,
              error: "ride-not-found",
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
