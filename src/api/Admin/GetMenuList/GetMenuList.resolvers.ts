/** @format */

import { Resolvers } from "../../../types/resolvers";
import adminPrivateResolvers from "../../../utils/adminPrivateResolvers";
import { GetMenuListResponse } from "../../../types/graph";
import { entities } from "../../..";

const resolvers: Resolvers = {
  Mutation: {
    GetMenuList: adminPrivateResolvers(
      async (_res, _args, { req }): Promise<GetMenuListResponse> => {
        const { admin } = req;

        console.log(admin);

        const data = await entities;
        const entityNames: string[] = data.map((d) => {
          const { name } = d;

          if (name.indexOf("_") == -1) {
            return name;
          }
        });

        const filtered: string[] = entityNames.filter(
          (entity) => entity !== undefined
        );
        console.log(filtered);

        return {
          ok: true,
          error: "testing",
          entityNames: filtered,
        };
      }
    ),
  },
};

export default resolvers;
