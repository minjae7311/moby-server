/** @format */

import { Resolvers } from "../../../types/resolvers";
import adminPrivateResolvers from "../../../utils/adminPrivateResolvers";
import {
  GetPaymentListMutationArgs,
  GetPaymentListResponse,
} from "../../../types/graph";
import Payment from "../../../entities/Payment";

const resolvers: Resolvers = {
  Mutation: {
    GetPaymentList: adminPrivateResolvers(
      async (
        _res,
        args: GetPaymentListMutationArgs,
        { req }
      ): Promise<GetPaymentListResponse> => {
        const { admin } = req;
        /**
         * @todo add order
         */
        const { take, page } = args;

        console.log(admin.id, "getting ride lists.");

        try {
          const payments = await Payment.find({
            skip: (page - 1) * take,
            take,
            relations: ["ride", "credit"],
          });

          console.log(payments);

          return {
            ok: true,
            error: null,
            payments,
          };
        } catch (e) {
          return {
            ok: false,
            error: e.message,
            payments: null,
          };
        }
      }
    ),
  },
};

export default resolvers;
