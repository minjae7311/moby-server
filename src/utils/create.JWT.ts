import jwt from "jsonwebtoken";
/**
 * @param {number} id
 * @returns {string} token
 */
const createJWT = (id: number): string => {
  const token = jwt.sign(
    {
      id: id,
    },
    process.env.JWT_TOKEN || ""
  );

  return token;
};

export default createJWT;
