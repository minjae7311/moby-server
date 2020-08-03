import { Resolvers } from "../../../types/resolvers";
import {
  AddNewSurveyQuestionMutationArgs,
  AddNewSurveyQuestionResponse,
} from "../../../types/graph";
import SurveyQuestion from "../../../entities/SurveyQuestion";
import cleanNullArgs from "../../../utils/cleanNullArg";

const resolvers: Resolvers = {
  Mutation: {
    AddNewSurveyQuestion: async (
      _res,
      args: AddNewSurveyQuestionMutationArgs
    ): Promise<AddNewSurveyQuestionResponse> => {
      if (!args.isSubjective && !args.answers) {
        return {
          ok: false,
          error: "not-subjective-question-requires-answer-options",
          surveyQuestion: null,
        };
      }

      try {
        const notNullArgs = cleanNullArgs(args);
        const surveyQuestion = await SurveyQuestion.create({
          ...notNullArgs,
        }).save();

        console.log("\n\n\n\n\n", args.answers);

        return {
          ok: true,
          error: null,
          surveyQuestion,
        };
      } catch (e) {
        return {
          ok: false,
          error: e.message,
          surveyQuestion: null,
        };
      }
    },
  },
};

export default resolvers;
