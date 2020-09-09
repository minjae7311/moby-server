import { Resolvers } from "../../../types/resolvers";
import adminPrivateResolvers from "../../../utils/adminPrivateResolvers";
import {
  GetAnsweredSurveyListQueryArgs,
  GetAnsweredSurveyListResponse,
} from "../../../types/graph";
import SurveyAnswered from "../../../entities/SurveyAnswered";

const resolvers: Resolvers = {
  Query: {
    GetAnsweredSurveyList: adminPrivateResolvers(
      async (
        _res,
        args: GetAnsweredSurveyListQueryArgs,
        { req }
      ): Promise<GetAnsweredSurveyListResponse> => {
        const { take, page } = args;

        try {
          const answeredSurvey = await SurveyAnswered.find({
            skip: (page - 1) * take,
            take,
            relations: [
              "user",
              "ride",
              "surveyForm",
              "ride.vehicle",
              "ride.from",
              "ride.to",
              "ride.payment",
            ],
          });

          return {
            ok: true,
            error: null,
            answeredSurvey,
          };
        } catch (e) {
          return {
            ok: false,
            error: e.message,
            answeredSurvey: null,
          };
        }
      }
    ),
  },
};

export default resolvers;
