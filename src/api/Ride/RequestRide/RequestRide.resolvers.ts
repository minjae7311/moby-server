import { Resolvers } from "../../../types/resolvers";
import privateResolver from "../../../utils/privateResolver";
import {
  RequestRideResponse,
  RequestRideMutationArgs,
} from "../../../types/graph";
import Ride from "../../../entities/Ride";
import Place from "../../../entities/Place";
import cleanNullArgs from "../../../utils/cleanNullArg";
import Chat from "../../../entities/Chat";

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
            chat: null,
          };
        } else {
          try {
            const from = await Place.findOne({ id: args.from.id });
            const to = await Place.findOne({ id: args.to.id });

            const newRide = await Ride.create({
              ...notNullArgs,
              from,
              to,
              passenger: user,
            }).save();

            const newChat = await Chat.create({
              passenger: user,
              ride: newRide,
            }).save();

            newRide.chat = newChat;
            newRide.save();

            pubSub.publish("rideRequesting", { SubscribeNewRide: newRide });

            /**
             * @todo
             */
            user.isRiding = false;
            user.save();

            return {
              ok: true,
              error: null,
              ride: newRide,
              chat: newChat,
            };
          } catch (e) {
            return {
              ok: false,
              error: e.message,
              ride: null,
              chat: null,
            };
          }
        }
      }
    ),
  },
};

export default resolvers;
