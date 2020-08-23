import cors from "cors";
import { GraphQLServer, PubSub } from "graphql-yoga";
import { NextFunction, Response } from "express";
import helmet from "helmet";
import logger from "morgan";
import schema from "./schema";
import decodeJWT from "./utils/decode.JWT";
import path from "path";
import fs from "fs";

class App {
  public app: GraphQLServer;
  /**
   * @todo Change to @redis or @Memcached
   */
  public pubSub: any;

  constructor() {
    this.pubSub = new PubSub();
    this.pubSub.ee.setMaxListeners(99);

    this.app = new GraphQLServer({
      schema,
      context: (req) => {
        const { connection: { context = null } = {} } = req;
        return {
          req: req.request,
          pubSub: this.pubSub,
          context,
        };
      },
    });
    this.middlewares();
  }

  /**
   * import middlewares
   */
  private middlewares = (): void => {
    const accessLogStream = fs.createWriteStream(
      path.join(__dirname, "access.log"),
      { flags: "a" }
    );

    this.app.express.use(cors());
    this.app.express.use(
      logger("combined", {
        skip: (req, res) => {
          return res.statusCode < 400;
        },
        stream: accessLogStream,
      })
    );
    this.app.express.use(helmet());
    this.app.express.use(this.jwt);
  };

  private jwt = async (
    req,
    _res: Response,
    next: NextFunction
  ): Promise<void> => {
    const token = req.get("X-JWT");

    if (token) {
      const person = await decodeJWT(token);

      if (person) {
        if (person.flag == "driver") req.driver = person.driver;
        else req.user = person.user;
      } else {
        req.user = undefined;
        req.driver = undefined;
      }
    }

    next();
  };
}

export default new App().app;
