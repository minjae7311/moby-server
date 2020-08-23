import jwt from "jsonwebtoken";
import User from "../entities/User";
import Driver from "../entities/Driver";

const decodeJWT = async (token: string) => {
  try {
    const decoded: any = jwt.verify(token, process.env.JWT_TOKEN);
    const { id, deviceId } = decoded;

    console.log(id, deviceId);

    if (deviceId === "driver") {
      const driver = await Driver.findOne(
        { id, accepted: true },
        { relations: ["vehicle"] }
      );

      return { driver, flag: "driver" };
    } else {
      const user = await User.findOne(
        { id, deviceId },
        { relations: ["credit"] }
      );

      return { user, flag: "user" };
    }
  } catch (error) {
    console.error("\nDECODE JSON TOKEN ERROR : ", error, "\n");
    return undefined;
  }
};

export default decodeJWT;
