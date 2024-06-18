import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { Strategy as LocalStrategy } from "passport-local";
import db from "../models/index.js";
import { generateJwt } from "../utils/jwt.utils.js";

const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } = process.env;

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
        return done(null, { member, token });
      } catch (error) {
        return done(error);
      }
    }
  )
);

// Stratégie Google pour la connexion via Google
passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:8080/api/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let member = await db.Member.findOne({
          where: { googleId: profile.id },
        });

        if (!member) {
          member = await db.Member.create({
            googleId: profile.id,
            firstname: profile.name.givenName,
            lastname: profile.name.familyName,
            email: profile.emails[0].value,
            role_id: 1,
            subscription_id: 1,
          });
        }

        const token = generateJwt({
          id: member.id,
          firstname: member.firstname,
          lastname: member.lastname,
          email: member.email,
          role_id: member.role_id,
          subscription_id: member.subscription_id,
        });

        console.log("Generated token: ", token);
        return done(null, { member, token });
      } catch (error) {
        console.error("Error in Google Strategy: ", error);
        return done(error);
      }
    }
  )
);

export default passport;
