import { Resolvers } from "../../../types/resolvers";
import privateResolver from "../../../utils/privateResolver";
import {
  RequestRideResponse,
  RequestRideMutationArgs,
} from "../../../types/graph";
import Ride from "../../../entities/Ride";
import Place from "../../../entities/Place";
import cleanNullArgs from "../../../utils/cleanNullArg";
import Payment from "../../../entities/Payment";
import Credit from "../../../entities/Credit";
import { requestPayment } from "../../../utils/functions.payment";
import { handleFindingDistance } from "../../../utils/handleFindingDistance";

const resolvers: Resolvers = {
  Mutation: {
    RequestRide: privateResolver(
      async (
        _res,
        args: RequestRideMutationArgs,
        { req, pubSub }
      ): Promise<RequestRideResponse> => {
        const { user } = req;
        const notNullArgs = cleanNullArgs(args);

        if (user.isRiding) {
          return {
            ok: false,
            error: "already-riding",
            ride: null,
          };
        } else {
          try {
            const from = await Place.create({
              address: args.fromAddress,
              lat: args.fromLat,
              lng: args.fromLng,
            }).save();
            const to = await Place.create({
              address: args.toAddress,
              lat: args.toLat,
              lng: args.toLng,
            }).save();

            const newRide = await Ride.create({
              ...notNullArgs,
              from,
              to,
              passenger: user,
              findingDistance: 10,
              requestedDate: new Date().toLocaleString(),
            }).save();

            const newPayment = await Payment.create({
              ride: newRide,
              price: args.expectingFee,
              credit: await Credit.findOne({ id: args.creditId }),
            }).save();

            const paymentResult = await requestPayment(newPayment, "initial");
            if (paymentResult.ok) {
              pubSub.publish("rideRequesting", { SubscribeNewRide: newRide });

              user.isRiding = true;
              user.save();

              handleFindingDistance(newRide, pubSub);

              return {
                ok: true,
                error: null,
                ride: newRide,
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
      }
    ),
  },
};

export default resolvers;
