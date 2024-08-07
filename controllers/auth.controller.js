import passport from "passport";
import authService from "../services/auth.service.js";
import { generateJwt } from "../utils/jwt.utils.js";
import { separateData } from "../utils/separateData.js";
import { partnerRegisterValidator } from "../validators/auth.validator.js";

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

  registerMember: async (req, res, next) => {
    try {
      const {
        firstname,
        lastname,
        password,
        email,
        birthdate,
        address_country,
        address_city,
        address_street,
        address_street_number,
        address_postcode,
      } = req.body;
      const newMember = await authService.registerMember(
        firstname,
        lastname,
        email,
        password,
        birthdate,
        address_country,
        address_city,
        address_street,
        address_street_number,
        address_postcode
      );
      const token = generateJwt(newMember);
      res.status(201).json({ member: newMember, token });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  registerPartner: async (req, res, next) => {
    try {
      // Validez les données ici avec Yup
      const validatedData = await partnerRegisterValidator.validate(req.body, {
        abortEarly: false,
      });

      // Séparez les données du partenaire et du contact partenaire
      const { contactData, partnerData } = separateData(validatedData);
      // console.log("les dataaaa : ", contactData, partnerData);

      // Enregistrez le partenaire et le contact partenaire
      const newPartner = await authService.registerPartner(
        partnerData,
        contactData
      );
      const token = generateJwt(newPartner);
      res.status(201).json({ Partner: newPartner, token });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  googleAuth: passport.authenticate("google", { scope: ["profile", "email"] }),

  googleAuthCallback: (req, res, next) => {
    passport.authenticate("google", { session: false }, (err, member, info) => {
      if (err) {
        console.log("Authentication error:", err);
        return next(err);
      }
      if (!member) {
        console.log("Authentication failed:", info.message);
        return res.status(401).json({ message: info.message });
      }
      res.json({ data: member });
    })(req, res, next);
  },
};

export default authController;
