import { Resolvers } from "../../../types/resolvers";
import privateResolver from "../../../utils/privateResolver";
import {
  GetMyPaybackResponse,
  GetMyPaybackQueryArgs,
} from "../../../types/graph";
import Ride from "../../../entities/Ride";
import User from "../../../entities/User";
import { Between } from "typeorm";

/**
 * @todo test
 */
const resolvers: Resolvers = {
  Query: {
    GetMyPayback: privateResolver(
      async (
        _res,
        args: GetMyPaybackQueryArgs,
        _req
      ): Promise<GetMyPaybackResponse> => {
        const { userId, from, to, includePaybacked } = args;

        try {
          const user = await User.findOne({ id: userId });

          if (user) {
            const paybacks = await Ride.find({
              where: {
                passenger: user,
                surveyCompleted: true || (includePaybacked ? false : true),
                createdAt: Between(from, to),
              },
              relations: ["vehicle"],
            });

            const amount = paybacks.reduce((acc, cur) => {
              acc += cur.vehicle.discount;

              return acc;
            }, 0.0);

            return {
              ok: true,
              error: null,
              amount,
            };
          } else {
            return {
              ok: false,
              error: "user-not-found",
              amount: null,
            };
          }
        } catch (e) {
          return {
            ok: false,
            error: e.message,
            amount: null,
          };
        }
      }
    ),
  },
};

export default resolvers;
