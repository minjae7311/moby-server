import { Resolvers } from "../../../types/resolvers";
import adminPrivateResolvers from "../../../utils/adminPrivateResolvers";
import { UpdateVehicleResponse, UpdateVehicleMutationArgs } from "../../../types/graph";
import Vehicle from "../../../entities/Vehicle";

const resolvers: Resolvers = {
	Mutation: {
		UpdateVehicle: adminPrivateResolvers(
			async (_res, args: UpdateVehicleMutationArgs, { req }): Promise<UpdateVehicleResponse> => {
				const { admin } = req;
				const { data } = args;

				console.log(admin.id, "Updating Vehicle");

				try {
					console.log(data);

					const vehicle = await Vehicle.findOne({ id: data.id });

					if (vehicle) {
						Object.keys(vehicle).forEach((key) => {
							if (key !== "updatedAt" && key !== "createdAt") vehicle[key] = data[key];
						});

						await vehicle.save();

						console.log(vehicle);

						return {
							ok: true,
							error: null,
						};
					} else {
						return {
							ok: false,
							error: "vehicle-not-found",
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
