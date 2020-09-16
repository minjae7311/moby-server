import { Resolvers } from "../../../types/resolvers";
import privateResolver from "../../../utils/privateResolver";
import {
  RequestRideResponse,
  RequestRideMutationArgs,
} from "../../../types/graph";
import Driver from "../../../entities/Driver";
import { Between } from "typeorm";
import { getDistance } from "../../../utils/getDistance";
import Place from "../../../entities/Place";
import cleanNullArgs from "../../../utils/cleanNullArg";
import Ride from "../../../entities/Ride";
import Credit from "../../../entities/Credit";

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

            /// Filtering drivers with vehicle
            const mappedDrivers = drvierList.filter((driver) => {
              return driver.vehicle.company === args.company;
            });

            if (mappedDrivers.length === 0) {
              return {
                ok: false,
                error: "no-drivers-nearby",
                ride: null,
              };
            }

            /// Sort driver with distance from where user is, asc.
            mappedDrivers.sort((a: Driver, b: Driver) => {
              if (
                getDistance(a.lat, a.lng, args.fromLat, args.fromLng) <
                getDistance(b.lat, b.lng, args.fromLat, args.fromLng)
              ) {
                return -1;
              } else if (
                getDistance(a.lat, a.lng, args.fromLat, args.fromLng) >
                getDistance(b.lat, b.lng, args.fromLat, args.fromLng)
              ) {
                return 1;
              } else {
                return 0;
              }
            });

            const driver = mappedDrivers[0];

            const ret = await Promise.all([
              Place.create({
                address: args.fromAddress,
                lat: args.fromLat,
                lng: args.fromLng,
              }).save(),
              Place.create({
                address: args.toAddress,
                lat: args.toLat,
                lng: args.toLng,
              }).save(),
            ]);

            const from = ret.filter((place) => {
              return place.lat === args.fromLat && place.lng === args.fromLng;
            })[0];

            const to = ret.filter((place) => {
              return place.lat === args.toLat && place.lng === args.toLng;
            })[0];

            const credit = await Credit.findOne({ id: args.creditId });

            const newRide = await Ride.create({
              ...notNullArgs,
              from,
              to,
              passenger: user,
              credit,
              requestedDate: String(new Date().getTime()),
              driver,
              vehicle: driver.vehicle,
            }).save();

            pubSub.publish("assignNewRide", { SubscribeNewRide: newRide });

            user.isRiding = true;
            user.save();

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
