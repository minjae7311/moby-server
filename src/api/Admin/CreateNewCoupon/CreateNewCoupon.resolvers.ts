import { Resolvers } from "../../../types/resolvers";
import adminPrivateResolvers from "../../../utils/adminPrivateResolvers";
import {
  CreateNewCouponMutationArgs,
  CreateNewCouponResponse,
} from "../../../types/graph";
import Coupon from "../../../entities/Coupon";
import { generateCode } from "../../../utils/generateCode";

const resolvers: Resolvers = {
  Mutation: {
    CreateNewCoupon: adminPrivateResolvers(
      async (
        _res,
        args: CreateNewCouponMutationArgs,
        { req }
      ): Promise<CreateNewCouponResponse> => {
        const { code, expiry } = args;

        console.log(code, expiry);
        try {
          if (!code) {
            const newCoupon = await Coupon.create({
              code: generateCode(10),
            }).save();

            return {
              ok: true,
              error: null,
              code: newCoupon.code,
            };
          } else {
            const newCoupon = await Coupon.create({ code }).save();

            return {
              ok: true,
              error: null,
              code: newCoupon.code,
            };
          }
        } catch (e) {
          return {
            ok: false,
            error: e.message,
            code: null,
          };
        }
      }
    ),
  },
};

export default resolvers;
