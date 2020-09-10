/** @format */

import { Resolvers } from "../../../types/resolvers";
import adminPrivateResolvers from "../../../utils/adminPrivateResolvers";
import { GetEnquriesResponse } from "../../../types/graph";
import Enquiry from "../../../entities/Enquiry";

const resolvers: Resolvers = {
  Query: {
    GetEnquries: adminPrivateResolvers(
      async (_res, _args, { req }): Promise<GetEnquriesResponse> => {
        try {
          const enquries = await Enquiry.find({ relations: ["user"] });

          return {
            ok: true,
            error: null,
            enquries,
          };
        } catch (e) {
          return {
            ok: false,
            error: e.message,
            enquries: null,
          };
        }
      }
    ),
  },
};

export default resolvers;
