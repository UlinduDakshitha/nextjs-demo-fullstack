import jwt from "jsonwebtoken";

const SECRET = "MY_SECRET_KEY";

export const generateToken = (user) => {
  return jwt.sign(
    { id: user.id, email: user.email },
    SECRET,
    { expiresIn: "1d" }
  );
};

export const verifyToken = (token) => {
  return jwt.verify(token, SECRET);
};