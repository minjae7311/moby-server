import { Options } from "graphql-yoga";
import app from "./app";
import dotenv from "dotenv";

dotenv.config();

import ConnectionOptions from "./ormConfig";
import { createConnection } from "typeorm";
import Driver from "./entities/Driver";
import decodeJWT from "./utils/decode.JWT";

const PORT: number | string = process.env.PORT || 4000;
const PLAYGROUND_ENDPOINT: string = "/playground";
const GRAPHQL_ENDPOINT: string = "/graphql";
const SUBSCRIPTION_ENDPOINT: string = "/subscription";

const appOptions: Options = {
  port: PORT,
  playground: PLAYGROUND_ENDPOINT,
  endpoint: GRAPHQL_ENDPOINT,
  subscriptions: {
    path: SUBSCRIPTION_ENDPOINT,
    onConnect: async (connectionParams) => {
      /**
       * @todo get currentDriver with json token
       */
      const currentDriver = await Driver.findOne(
        { id: 5 },
        { relations: ["vehicle"] }
      );

      const token = connectionParams["X-JWT"];
      const currentUser = await decodeJWT(token);

      return {
        currentDriver,
        currentUser,
      };
    },
  },
};

const handleAppStart = () => {
  console.log("\n\n\n\n\n\nSTART APP..");
  console.info(new Date().toLocaleString());
  console.log(`Listening on port ${PORT}`);
};

createConnection(ConnectionOptions)
  .then(() => {
    app.start(appOptions, handleAppStart);
  })
  .catch((error) => console.log(error));
