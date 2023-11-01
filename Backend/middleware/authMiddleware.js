import jwt from "jsonwebtoken";
export const verifyToken = (req, res, next) => {
  const token = req.headers.cookie;
  if (!token) {
    return res
      .status(401)
      .json({ message: "Access denied...No token provided..." });
  }
  try {
    const newtoken=token.split('=')[1]
    const decoded = jwt.verify(newtoken, process.env.JWT_SECRET_KEY);
    console.log("decoded",decoded)
    req.user = decoded._id;
    next();
  } catch (error) {
    res.clearCookie("token");
    return res.status(400).json({ message: "Invalid Token" });
  }
};

