import { Resolvers } from "../../../types/resolvers";
import adminPrivateResolvers from "../../../utils/adminPrivateResolvers";
import { GetAnsweredSurveyListResponse } from "../../../types/graph";
import SurveyAnswered from "../../../entities/SurveyAnswered";

const resolvers: Resolvers = {
	Query: {
		GetAnsweredSurveyList: adminPrivateResolvers(
			async (_res, _args, { req }): Promise<GetAnsweredSurveyListResponse> => {
				try {
					const answeredSurvey = await SurveyAnswered.find({
						relations: ["user", "ride", "surveyForm", "ride.vehicle", "ride.from", "ride.to", "ride.payment"],
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
