import jwt from "jsonwebtoken";
import User from "../entities/User";

const decodeJWT = async (token: string): Promise<User | undefined> => {
  try {
    const decoded: any = jwt.verify(token, process.env.JWT_TOKEN);
    const { id, deviceId } = decoded;
    console.log("###########");
    console.log(id, deviceId);
    const user = await User.findOne({ id, deviceId });
    console.log(user);

    return user;
  } catch (error) {
    return undefined;
  }
};

export default decodeJWT;
