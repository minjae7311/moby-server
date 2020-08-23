import { Resolvers } from "../../../types/resolvers";
import privateResolver from "../../../utils/privateResolver";
import {
  RequestRideResponse,
  RequestRideMutationArgs,
} from "../../../types/graph";
import Ride from "../../../entities/Ride";
import Place from "../../../entities/Place";
import cleanNullArgs from "../../../utils/cleanNullArg";
// import Payment from "../../../entities/Payment";
// import Credit from "../../../entities/Credit";
// import { requestPayment } from "../../../utils/functions.payment";
import { handleFindingDistance } from "../../../utils/handleFindingDistance";
import Driver from "../../../entities/Driver";
import { Between } from "typeorm";

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
            const drvierList = await Driver.find({
              where: {
                workingOn: true,
                isDriving: false,
                lat: Between(args.fromLat - 0.05, args.fromLat + 0.05),
                lng: Between(args.fromLng - 0.05, args.fromLng + 0.05),
              },
              relations: ["vehicle"],
            });

            const mappedDrivers = drvierList.map((driver) => {
              return driver.vehicle.company === args.company;
            });

            console.log(mappedDrivers);

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
              requestedDate: new Date().toLocaleString(),
            }).save();
            pubSub.publish("rideRequesting", { SubscribeNewRide: newRide });

            user.isRiding = true;
            user.save();

            handleFindingDistance(newRide, pubSub);

            return {
              ok: true,
              error: null,
              ride: newRide,
            };
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
