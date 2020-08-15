import jwt from "jsonwebtoken";
import User from "../entities/User";

const decodeJWT = async (token: string): Promise<User | undefined> => {
  try {
    const decoded: any = jwt.verify(token, process.env.JWT_TOKEN);
    const { id, deviceId } = decoded;
    const user = await User.findOne(
      { id, deviceId },
      {
        relations: ["credit"],
      }
    );

    return user;
  } catch (error) {
    console.error("\nDECODE JSON TOKEN ERROR : ", error, "\n");
    return undefined;
  }
};

export default decodeJWT;
