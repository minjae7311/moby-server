import { Resolvers } from "../../../types/resolvers";
import Driver from "../../../entities/Driver";
import {
  AddNewDriverResponse,
  AddNewDriverMutationArgs,
} from "../../../types/graph";
import Vehicle from "../../../entities/Vehicle";

const resolvers: Resolvers = {
  Mutation: {
    AddNewDriver: async (
      _res,
      args: AddNewDriverMutationArgs,
      _req
    ): Promise<AddNewDriverResponse> => {
      const vehicle = await Vehicle.create({ id: args.vehicleId });
      try {
        const newDriver = await Driver.create({ vehicle }).save();
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
