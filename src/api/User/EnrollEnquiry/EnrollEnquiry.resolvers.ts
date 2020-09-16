import { Resolvers } from "../../../types/resolvers";
import privateResolver from "../../../utils/privateResolver";
import {
  EnrollEnquiryMutationArgs,
  EnrollEnquiryResponse,
} from "../../../types/graph";
import Enquiry from "../../../entities/Enquiry";

const resolvers: Resolvers = {
  Mutation: {
    EnrollEnquiry: privateResolver(
      async (
        _res,
        args: EnrollEnquiryMutationArgs,
        { req }
      ): Promise<EnrollEnquiryResponse> => {
        const { user } = req;

        try {
          const { questionTitle, questionContent } = args;
          await Enquiry.create({
            questionTitle,
            questionContent,
            user,
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
    ),
  },
};

export default resolvers;
