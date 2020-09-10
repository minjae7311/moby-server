/** @format */

import { Resolvers } from "../../../types/resolvers";
import adminPrivateResolvers from "../../../utils/adminPrivateResolvers";
import {
  GetEnquiriesResponse,
  GetEnquiriesQueryArgs,
} from "../../../types/graph";
import Enquiry from "../../../entities/Enquiry";

const resolvers: Resolvers = {
  Query: {
    GetEnquiries: adminPrivateResolvers(
      async (
        _res,
        args: GetEnquiriesQueryArgs,
        { req }
      ): Promise<GetEnquiriesResponse> => {
        const { take, page } = args;

        try {
          const enquiries = await Enquiry.find({
            skip: (page - 1) * take,
            take,
            relations: ["user"],
          });

          console.log(enquiries);

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
