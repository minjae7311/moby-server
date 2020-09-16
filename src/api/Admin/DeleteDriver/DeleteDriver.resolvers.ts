import { Resolvers } from "../../../types/resolvers";
import adminPrivateResolvers from "../../../utils/adminPrivateResolvers";
import { DeleteDriverMutationArgs, DeleteDriverResponse } from "../../../types/graph";
import Driver from "../../../entities/Driver";

const resolvers: Resolvers = {
	Mutation: {
		DeleteDriver: adminPrivateResolvers(
			async (_res, args: DeleteDriverMutationArgs, { req }): Promise<DeleteDriverResponse> => {
				const { driverId } = args;

				try {
					const driver = await Driver.findOne({ id: driverId });

					if (!driver) {
						return {
							ok: false,
							error: "not-found",
						};
					}

					await driver?.softRemove();

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
