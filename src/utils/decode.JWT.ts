import jwt from "jsonwebtoken";
import User from "../entities/User";

const decodeJWT = async (token: string): Promise<User | undefined> => {
  try {
    const decoded: any = jwt.verify(token, process.env.JWT_TOKEN);
    const { id, deviceId } = decoded;
    const user = await User.findOne(
      { id, deviceId },
      {
<<<<<<< HEAD
        relations: ["credit", "mainCredit"],
=======
        relations: ["credit"],
>>>>>>> a74f8e9d1e8176b877933846630694e8775d3c27
      }
    );

    return user;
  } catch (error) {
    return undefined;
  }
};

export default decodeJWT;
