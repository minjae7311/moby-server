import { Resolvers } from "../../../types/resolvers";
import privateResolver from "../../../utils/privateResolver";
import {
  GetMySurveyResponse,
  GetMySurveyQueryArgs,
} from "../../../types/graph";
import Ride from "../../../entities/Ride";

const resolvers: Resolvers = {
  Query: {
    GetMySurvey: privateResolver(
      async (
        _res,
        args: GetMySurveyQueryArgs,
        { req }
      ): Promise<GetMySurveyResponse> => {
        // const { user } = req;

        try {
          const ride = await Ride.findOne(
            { id: args.rideId },
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
