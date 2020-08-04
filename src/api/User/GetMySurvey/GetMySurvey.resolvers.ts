import { Resolvers } from "../../../types/resolvers";
import privateResolver from "../../../utils/privateResolver";
import { GetMySurveyResponse } from "../../../types/graph";
import Ride from "../../../entities/Ride";

const resolvers: Resolvers = {
  Query: {
    GetMySurvey: privateResolver(
      async (_res, _args, { req }): Promise<GetMySurveyResponse> => {
        const { user } = req;

        if (!user.isRiding) {
          return {
            ok: false,
            error: "user-not-riding",
            survey: null,
          };
        }

        try {
          const ride = await Ride.findOne(
            { passenger: user, status: "ONROUTE" },
            { relations: ["vehicle", "vehicle.surveyForm"] }
          );

          if (!ride) {
            return {
              ok: false,
              error: "ride-not-found",
              survey: null,
            };
          }

          return {
            ok: true,
            error: null,
            survey: ride.vehicle.surveyForm,
          };
        } catch (e) {
          return {
            ok: false,
            error: e.message,
            survey: null,
          };
        }
      }
    ),
  },
};
export default resolvers;
