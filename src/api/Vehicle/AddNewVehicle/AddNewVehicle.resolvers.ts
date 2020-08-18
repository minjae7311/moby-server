import { Resolvers } from "../../../types/resolvers";
import {
  AddNewVehicleMutationArgs,
  AddNewVehicleResponse,
} from "../../../types/graph";
import cleanNullArgs from "../../../utils/cleanNullArg";
import SurveyForm from "../../../entities/SurveyForm";
import Vehicle from "../../../entities/Vehicle";

const resolvers: Resolvers = {
  Mutation: {
    AddNewVehicle: async (
      _res,
      args: AddNewVehicleMutationArgs
    ): Promise<AddNewVehicleResponse> => {
      const notNullArgs = cleanNullArgs(args);

      try {
        const surveyForm = await SurveyForm.findOne({
          id: args.surveyFormId!,
        });

        if (surveyForm) {
          const vehicle = await Vehicle.create({
            ...notNullArgs,
            surveyForm,
          }).save();

          return {
            ok: true,
            error: null,
            vehicle,
          };
        } else {
          return {
            ok: false,
            error: "survey-not-found",
            vehicle: null,
          };
        }
      } catch (e) {
        return {
          ok: false,
          error: e.message,
          vehicle: null,
        };
      }
    },
  },
};

export default resolvers;
