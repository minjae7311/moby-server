import { Resolvers } from "../../../types/resolvers";
import adminPrivateResolvers from "../../../utils/adminPrivateResolvers";
import Interests from "../../../entities/Interests";
import { AddInterestMutationArgs, AddInterestResponse } from "../../../types/graph";
import cleanNullArgs from "../../../utils/cleanNullArg";

const resolvers: Resolvers = {
	Mutation: {
		AddInterest: adminPrivateResolvers(
			async (_res, args: AddInterestMutationArgs, { req }): Promise<AddInterestResponse> => {
				const notNullArgs = cleanNullArgs(args);

				try {
					const newInterest = await Interests.create({ ...notNullArgs }).save();

					if (!newInterest) {
						return {
							ok: false,
							error: "failed-to-create-Interest",
						};
					}

					newInterest.save();

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
