import { Resolvers } from "../../../types/resolvers";
import { AddPlaceMutationArgs, AddPlaceResponse } from "../../../types/graph";
import Place from "../../../entities/Place";
import cleanNullArgs from "../../../utils/cleanNullArg";

const resolvers: Resolvers = {
  Mutation: {
    AddPlace: async (
      _res,
      args: AddPlaceMutationArgs,
      _req
    ): Promise<AddPlaceResponse> => {
      const { lat, lng } = args;
      const existingPlace = await Place.findOne({
        lat,
        lng,
      });

      if (existingPlace) {
        return {
          ok: true,
          error: null,
          placeId: existingPlace.id,
        };
      } else {
        try {
          const notNullArgs = cleanNullArgs(args);

          const newPlace = await Place.create({
            ...notNullArgs,
          }).save();

          return {
            ok: true,
            error: null,
            placeId: newPlace.id,
          };
        } catch (e) {
          return {
            ok: false,
            error: e.message,
            placeId: null,
          };
        }
      }
    },
  },
};

export default resolvers;
