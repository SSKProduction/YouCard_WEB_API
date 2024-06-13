import argon2 from "argon2";
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import db from "../models/index.js";
import { generateJwt } from "../utils/jwt.utils.js";

// Stratégie locale pour la connexion par email/mot de passe
passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    async (email, password, done) => {
      try {
        const member = await db.Member.findOne({ where: { email } });
        if (!member) {
          return done(null, false, { message: "Email incorrect." });
        }
        const isMatch = await argon2.verify(member.password, password);
        if (!isMatch) {
          return done(null, false, { message: "Mot de passe incorrect." });
        }
        const token = generateJwt(member);
        return done(null, { member: member, token });
      } catch (error) {
        return done(error);
      }
    }
  )
);
export default passport;
