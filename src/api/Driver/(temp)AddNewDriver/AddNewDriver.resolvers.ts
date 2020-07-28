import { Resolvers } from "../../../types/resolvers";
import Driver from "../../../entities/Driver";
import { AddNewDriverResponse } from "../../../types/graph";

const resolvers: Resolvers = {
  Mutation: {
    AddNewDriver: async (_res, _args, _req): Promise<AddNewDriverResponse> => {
      try {
        const newDriver = await Driver.create().save();
        return {
          ok: true,
          error: null,
          driver: newDriver,
        };
      } catch (e) {
        return {
          ok: true,
          error: e.message,
          driver: null,
        };
      }
    },
  },
};

export default resolvers;
