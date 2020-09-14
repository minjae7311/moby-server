import { Resolvers } from "../../../types/resolvers";
import adminPrivateResolvers from "../../../utils/adminPrivateResolvers";
import { DeleteCreditMutationArgs, DeleteCreditResponse } from "../../../types/graph";
import Credit from "../../../entities/Credit";

const resolvers: Resolvers = {
	Mutation: {
		DeleteCredit: adminPrivateResolvers(
			async (_res, args: DeleteCreditMutationArgs, { req }): Promise<DeleteCreditResponse> => {
				const { creditId } = args;

				try {
					const credit = await Credit.findOne({ id: creditId });

					if (!credit) {
						return {
							ok: false,
							error: "not-found",
						};
					}

					await credit.remove();

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
