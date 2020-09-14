import { Resolvers } from "../../../types/resolvers";
import adminPrivateResolvers from "../../../utils/adminPrivateResolvers";
import { UpdateDriverDataMutationArgs, UpdateDriverDataResponse } from "../../../types/graph";
import Driver from "../../../entities/Driver";

const resolvers: Resolvers = {
	Mutation: {
		UpdateDriverData: adminPrivateResolvers(
			async (res, args: UpdateDriverDataMutationArgs, { req }): Promise<UpdateDriverDataResponse> => {
				try {
					const { data } = args;

					const driver = await Driver.findOne({ id: data.id });

					if (driver) {
						Object.keys(driver).forEach((key) => {
							if (key !== "updatedAt" && key !== "createdAt") driver[key] = data[key];
						});

						await driver.save();

						return {
							ok: true,
							error: null,
						};
					} else {
						return {
							ok: false,
							error: "user-not-found",
						};
					}
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
