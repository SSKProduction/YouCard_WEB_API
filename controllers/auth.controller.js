import passport from "passport";
import authService from "../services/auth.service.js";
import { generateJwt } from "../utils/jwt.utils.js";

const authController = {
  login: (req, res, next) => {
    passport.authenticate("local", { session: false }, (err, member, info) => {
      if (err) {
        return next(err);
      }
      if (!member) {
        return res.status(401).json({ message: info.message });
      }

      const token = generateJwt(member);
      res.json({ user: member, token });
    })(req, res, next);
  },

  register: async (req, res, next) => {
    try {
      const { email, password } = req.body;
      const newMember = await authService.register(email, password);
      const token = generateJwt(newMember);
      res.status(201).json({ member: newMember, token });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  googleAuth: passport.authenticate("google", { scope: ["profile", "email"] }),

  googleAuthCallback: (req, res, next) => {
    passport.authenticate("google", { session: false }, (err, member, info) => {
      if (err) {
        return next(err);
      }
      if (!member) {
        return res.status(401).json({ message: info.message });
      }

      const token = generateJwt(member);
      res.json({ user: member, token });
    })(req, res, next);
  },
};

export default authController;
