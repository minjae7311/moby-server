import { Resolvers } from "../../../types/resolvers";
import { AddInterestMutationArgs, AddInterestResponse } from "../../../types/graph";
import Interests from "../../../entities/Interests";
import adminPrivateResolvers from "../../../utils/adminPrivateResolvers";

const resolvers: Resolvers = {
	Mutation: {
		AddInterest: adminPrivateResolvers(
			async (_, args: AddInterestMutationArgs, { req }): Promise<AddInterestResponse> => {
				try {
					const newInterest = await Interests.create({ ...args }).save();

					if (newInterest) {
						return {
							ok: true,
							error: null,
						};
					} else {
						return {
							ok: false,
							error: "Fail to create Interest",
						};
					}
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
