import { Resolvers } from "../../../types/resolvers";
import adminPrivateResolvers from "../../../utils/adminPrivateResolvers";
import Driver from "../../../entities/Driver";
import { ApproveDriverMutationArgs, ApproveDriverResponse } from "../../../types/graph";

const resolvers: Resolvers = {
	Mutation: {
		ApproveDriver: adminPrivateResolvers(
			async (_res, args: ApproveDriverMutationArgs, { req }): Promise<ApproveDriverResponse> => {
				const { driverId } = args;

				try {
					const driver = await Driver.findOne({ id: driverId });

					if (!driver) {
						return {
							ok: false,
							error: "not-found",
						};
					}

					driver.accepted = true;
					await driver.save();

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
