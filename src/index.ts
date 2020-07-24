import { Options } from "graphql-yoga";
import app from "./app";
import dotenv from "dotenv";

dotenv.config();

import ConnectionOptions from "./ormConfig";
import { createConnection } from "typeorm";
import Driver from "./entities/Driver";

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
       * @todo
       */
      const currentDriver = await Driver.findOne({ id: 1 });
      return {
        currentDriver,
      };
    },
  },
};

const handleAppStart = () => {
  console.log(`Listening on port ${PORT}`);
};

createConnection(ConnectionOptions)
  .then(() => {
    app.start(appOptions, handleAppStart);
  })
  .catch((error) => console.log(error));
