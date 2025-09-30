import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1];
  }

//   Or cookie (if you choose to put token in cookie)
//   else if (req.cookies.token) token = req.cookies.token;

  if (!token) {
    res.status(401);
    return next(new Error("Not authorized, token missing"));
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { id: decoded.id, role: decoded.role };
    // Optionally fetch full user document:
    // req.user = await User.findById(decoded.id).select('-password');
    next();
  } catch (err) {
    res.status(401);
    next(new Error("Not authorized, token failed"));
  }
};

export const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      res.status(401);
      return next(new Error("Not authorized"));
    }
    if (!roles.includes(req.user.role)) {
      res.status(403);
      return next(new Error("Forbidden: insufficient permissions"));
    }
    next();
  };
};
