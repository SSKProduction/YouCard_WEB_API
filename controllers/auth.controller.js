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

      const token = generateJwt(member); // Assurez-vous d'accéder correctement au membre depuis user
      res.json({ user: member, token }); // Assurez-vous de renvoyer correctement le membre
    })(req, res, next);
  },
};
export default authController;
