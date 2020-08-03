import { Resolvers } from "../../../types/resolvers";
import SurveyQuestion from "../../../entities/SurveyQuestion";
import {
  AddNewSurveyFormMutationArgs,
  AddNewSurveyFormResponse,
} from "../../../types/graph";
import SurveyForm from "../../../entities/SurveyForm";
import cleanNullArgs from "../../../utils/cleanNullArg";

const resolvers: Resolvers = {
  Mutation: {
    AddNewSurveyForm: async (
      _res,
      args: AddNewSurveyFormMutationArgs
    ): Promise<AddNewSurveyFormResponse> => {
      const questions = await SurveyQuestion.findByIds(args.questionIds);
      const notNullArgs = cleanNullArgs(args);

      if (questions.length == 0) {
        return {
          ok: false,
          error: "questions-not-found",
          surveyForm: null,
        };
      }

      try {
        const surveyForm = await SurveyForm.create({
          questions,
          ...notNullArgs,
        }).save();

        return {
          ok: true,
          error: null,
          surveyForm,
        };
      } catch (e) {
        return {
          ok: false,
          error: e.message,
          surveyForm: null,
        };
      }
    },
  },
};

export default resolvers;
