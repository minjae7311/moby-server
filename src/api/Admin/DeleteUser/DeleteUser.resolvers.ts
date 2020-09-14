import { Resolvers } from "../../../types/resolvers";
import adminPrivateResolvers from "../../../utils/adminPrivateResolvers";
import { DeleteUserMutationArgs, DeleteUserResponse } from "../../../types/graph";
import User from "../../../entities/User";

const resolvers: Resolvers = {
	Mutation: {
		DeleteUser: adminPrivateResolvers(
			async (_res, args: DeleteUserMutationArgs, { req }): Promise<DeleteUserResponse> => {
				const { userId } = args;

				try {
					const user = await User.findOne({ id: userId }, { relations: [""] });

					if (!user) {
						return {
							ok: false,
							error: "not-found",
						};
					}

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
