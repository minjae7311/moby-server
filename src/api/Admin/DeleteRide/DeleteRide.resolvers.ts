import { Resolvers } from "../../../types/resolvers";
import adminPrivateResolvers from "../../../utils/adminPrivateResolvers";
import Ride from "../../../entities/Ride";
import { DeleteRideMutationArgs, DeleteRideResponse } from "../../../types/graph";

const resolvers: Resolvers = {
	Mutation: {
		DeleteRide: adminPrivateResolvers(
			async (_res, args: DeleteRideMutationArgs, { req }): Promise<DeleteRideResponse> => {
				const { rideId } = args;

				try {
					const ride = await Ride.findOne({ id: rideId });

					if (!ride) {
						return {
							ok: false,
							error: "not-found",
						};
					}

					await ride.softRemove();

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
