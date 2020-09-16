import { Resolvers } from "../../../types/resolvers";
import {
  DriverSignUpMutationArgs,
  DriverSignUpResponse,
} from "../../../types/graph";
import cleanNullArgs from "../../../utils/cleanNullArg";
import Driver from "../../../entities/Driver";
import createJWT from "../../../utils/create.JWT";

const resolvers: Resolvers = {
  Mutation: {
    DriverSignUp: async (
      _res,
      args: DriverSignUpMutationArgs,
      _req
    ): Promise<DriverSignUpResponse> => {
      const notNullArgs = cleanNullArgs(args);

      try {
        const newDriver = await Driver.create({ ...notNullArgs }).save();
        const token = createJWT(newDriver.id, "driver");

        return {
          ok: true,
          error: null,
          token,
        };
      } catch (e) {
        return {
          ok: false,
          error: e.message,
          token: null,
        };
      }
    },
  },
};

export default resolvers;
