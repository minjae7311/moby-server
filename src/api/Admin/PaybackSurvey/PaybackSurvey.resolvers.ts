import { Resolvers } from "../../../types/resolvers";
import adminPrivateResolvers from "../../../utils/adminPrivateResolvers";
import { PaybackSurveyMutationArgs, PaybackSurveyResponse } from "../../../types/graph";
import SurveyAnswered from "../../../entities/SurveyAnswered";

const resolvers: Resolvers = {
	Mutation: {
		PaybackSurvey: adminPrivateResolvers(
			async (_req, args: PaybackSurveyMutationArgs, { req }): Promise<PaybackSurveyResponse> => {
				const { surveyId } = args;

				try {
					const survey = await SurveyAnswered.findOne({ id: surveyId });

					if (!survey) {
						return {
							ok: false,
							error: "not-found",
						};
					}

					survey.paybacked = true;
					await survey.save();

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
