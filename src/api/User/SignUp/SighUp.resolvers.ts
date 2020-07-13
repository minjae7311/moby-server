import { SignUpResponse, SignUpMutationArgs } from "../../../types/graph";

const resolvers = {
  Mutation: {
    SignUp: (_, args: SignUpMutationArgs): SignUpResponse => {
      return {
        ok: true,
        error: "hihi",
      };
    },
  },
};

export default resolvers;
