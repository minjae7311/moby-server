import { Resolvers } from "../../../types/resolvers";
import privateResolver from "../../../utils/privateResolver";
import { AddPlaceMutationArgs, AddPlaceResponse } from "../../../types/graph";
import Place from "../../../entities/Place";
import cleanNullArgs from "../../../utils/cleanNullArg";

const resolvers: Resolvers = {
  Mutation: {
    AddPlace: privateResolver(
      async (
        _res,
        args: AddPlaceMutationArgs,
        { req }
      ): Promise<AddPlaceResponse> => {
        // const { user } = req;
        const notNullArgs = cleanNullArgs(args);

        const existingPlace = await Place.findOne({
          ...notNullArgs,
        });

        if (existingPlace) {
          return {
            ok: true,
            error: null,
          };
        } else {
          try {
            await Place.create({
              ...notNullArgs,
            }).save();

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
      }
    ),
  },
};

export default resolvers;
