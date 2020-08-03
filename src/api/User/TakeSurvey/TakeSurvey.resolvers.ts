import { Resolvers } from "../../../types/resolvers";
import privateResolver from "../../../utils/privateResolver";
import {
  TakeSurveyResponse,
  TakeSurveyMutationArgs,
} from "../../../types/graph";
import Ride from "../../../entities/Ride";
import SurveyAnswered from "../../../entities/SurveyAnswered";

const resolvers: Resolvers = {
  Mutation: {
    TakeSurvey: privateResolver(
      async (
        _res,
        args: TakeSurveyMutationArgs,
        { req }
      ): Promise<TakeSurveyResponse> => {
        const { user } = req;

        if (!user.isRiding) {
          return {
            ok: false,
            error: "user-not-riding",
          };
        }

        const ride = await Ride.findOne(
          { passenger: user, status: "ONROUTE" },
          { relations: ["vehicle", "vehicle.surveyForm"] }
        );

        if (!ride) {
          return {
            ok: false,
            error: "ride-not-found",
          };
        }

        try {
          const { answeredJson } = args;
          await SurveyAnswered.create({
            answeredJson,
            ride,
            user,
            surveyForm: ride.vehicle.surveyForm,
          }).save();

          ride.surveyCompleted = true;
          await ride.save();

          return {
            ok: true,
            error: null,
          };
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
