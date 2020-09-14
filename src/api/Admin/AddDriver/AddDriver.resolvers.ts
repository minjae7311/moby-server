import { Resolvers } from "../../../types/resolvers";
import adminPrivateResolvers from "../../../utils/adminPrivateResolvers";
import { AddDriverMutationArgs, AddDriverResponse } from "../../../types/graph";
import cleanNullArgs from "../../../utils/cleanNullArg";
import Driver from "../../../entities/Driver";

const resolvers: Resolvers = {
	Mutation: {
		AddDriver: adminPrivateResolvers(
			async (_res, args: AddDriverMutationArgs, { req }): Promise<AddDriverResponse> => {
				const notNullArgs = cleanNullArgs(args);

				try {
					const driver = await Driver.create({ ...notNullArgs, verifiedPhoneNumber: true }).save();

					if (!driver) {
						return {
							ok: false,
							error: "failed-to-create-driver",
							driver: null,
						};
					}

					return {
						ok: true,
						error: null,
						driver,
					};
				} catch (e) {
					return {
						ok: false,
						error: e.message,
						driver: null,
					};
				}
			}
		),
	},
};

export default resolvers;
