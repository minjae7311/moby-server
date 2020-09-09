/** @format */

import { Resolvers } from "../../../types/resolvers";
import adminPrivateResolvers from "../../../utils/adminPrivateResolvers";
import { GetEnquiriesResponse } from "../../../types/graph";
import Enquiry from "../../../entities/Enquiry";

const resolvers: Resolvers = {
  Query: {
    GetEnquiries: adminPrivateResolvers(
      async (_res, _args, { req }): Promise<GetEnquiriesResponse> => {
        try {
          const enquiries = await Enquiry.find({ relations: ["user"] });

          return {
            ok: true,
            error: null,
            enquiries,
          };
        } catch (e) {
          return {
            ok: false,
            error: e.message,
            enquiries: null,
          };
        }
      }
    ),
  },
};

export default resolvers;
