import { Resolvers } from "../../../types/resolvers";
import adminPrivateResolvers from "../../../utils/adminPrivateResolvers";
import User from "../../../entities/User";
import Verification from "../../../entities/Verification";
import { AddUserMutationArgs, AddUserResponse } from "../../../types/graph";
import cleanNullArgs from "../../../utils/cleanNullArg";

const resolvers: Resolvers = {
	Mutation: {
		AddUser: adminPrivateResolvers(
			async (_res, args: AddUserMutationArgs, { req }): Promise<AddUserResponse> => {
				const notNullArgs = cleanNullArgs(args);

				try {
					const user = await User.create({ ...notNullArgs, verifiedPhoneNumber: true }).save();

					if (!user) {
						return {
							ok: false,
							error: "failed-to-create-user",
							user: null,
						};
					}

					const verification = await Verification.create({ target: "PHONE", payload: "+821000000000", key: "ADMIN", verified: true, expired: true, user }).save();

					if (!verification) {
						return {
							ok: false,
							error: "failed-to-create-verification",
							user: null,
						};
					}

					user.verification = verification;
					user.save();

					return {
						ok: true,
						error: null,
						user,
					};
				} catch (e) {
					return {
						ok: false,
						error: e.message,
						user: null,
					};
				}
			}
		),
	},
};

export default resolvers;
