import { Resolvers } from "../../../types/resolvers";
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
      const notNullArgs = cleanNullArgs(args);

      try {
        const surveyForm = await SurveyForm.create({
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
