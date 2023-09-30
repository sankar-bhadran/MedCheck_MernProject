import User from "../model/User.js";
export const blockUser = async (req, res) => {
  try {
    const user = await User.findById({ _id: req.user });
    if (user.is_blocked) {
      return res.status(200).json({ message: "Your Blocked" });
    }
    next();
  } catch (error) {
    return res.status(400).json({ message: "Something went wrong" });
  }
};
