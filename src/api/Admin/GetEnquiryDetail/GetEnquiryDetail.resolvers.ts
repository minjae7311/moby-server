import { Resolvers } from "../../../types/resolvers";
import adminPrivateResolvers from "../../../utils/adminPrivateResolvers";
import {
  GetEnquiryDetailQueryArgs,
  GetEnquiryDetailResponse,
} from "../../../types/graph";
import Enquiry from "../../../entities/Enquiry";

const resolvers: Resolvers = {
  Query: {
    GetEnquiryDetail: adminPrivateResolvers(
      async (
        _res,
        args: GetEnquiryDetailQueryArgs,
        { req }
      ): Promise<GetEnquiryDetailResponse> => {
        const { id } = args;

        try {
          const enquiry = await Enquiry.findOne(
            { id },
            { relations: ["user"] }
          );

          if (enquiry) {
            return {
              ok: true,
              error: null,
              enquiry,
            };
          } else {
            return {
              ok: false,
              error: "enquiry-not-found",
              enquiry: null,
            };
          }
        } catch (error) {
          return {
            ok: false,
            error: error.message,
            enquiry: null,
          };
        }
      }
    ),
  },
};

export default resolvers;
