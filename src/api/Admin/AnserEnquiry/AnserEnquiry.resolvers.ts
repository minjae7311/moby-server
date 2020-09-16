import { Resolvers } from "../../../types/resolvers";
import adminPrivateResolvers from "../../../utils/adminPrivateResolvers";
import {
  AnswerEnquiryMutationArgs,
  AnswerEnquiryResponse,
} from "../../../types/graph";
import Enquiry from "../../../entities/Enquiry";

const resolvers: Resolvers = {
  Mutation: {
    AnswerEnquiry: adminPrivateResolvers(
      async (
        _res,
        args: AnswerEnquiryMutationArgs,
        { req }
      ): Promise<AnswerEnquiryResponse> => {
        const { id } = args;

        try {
          const enquiry = await Enquiry.findOne(
            { id },
            { relations: ["user"] }
          );

          if (!enquiry) {
            return {
              ok: false,
              error: "not-found",
            };
          }

          /**
           * @todo push
           * @var enquiry.user.pushToken
           */

          enquiry.answerTitle = args.answerTitle;
          enquiry.answerContent = args.answerContent;
          await enquiry.save();

          return {
            ok: true,
            error: null,
          };
        } catch (error) {
          return {
            ok: false,
            error: error.message,
          };
        }
      }
    ),
  },
};

export default resolvers;
