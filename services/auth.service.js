import argon2 from "argon2";
import db from "../models/index.js";

const authService = {
  registerMember: async (firstname, lastname, email, password) => {
    try {
      // Vérifiez si l'email est déjà utilisé
      const existingMember = await db.Member.findOne({ where: { email } });
      if (existingMember) {
        throw new Error("L'email est déjà utilisé.");
      }

      // Hash le mot de passe
      const hashedPassword = await argon2.hash(password);

      // Créez un nouveau membre
      const newMember = await db.Member.create({
        firstname,
        lastname,
        email,
        password: hashedPassword,
        role_id: 1,
        subscription_id: 1,
      });

      return newMember;
    } catch (error) {
      throw error;
    }
  },
  registerPartner: async (email, password) => {
    try {
      // Vérifiez si l'email est déjà utilisé
      const existingPartner = await db.Partner.findOne({ where: { email } });
      if (existingPartner) {
        throw new Error("L'email est déjà utilisé.");
      }

      // Hash le mot de passe
      const hashedPassword = await argon2.hash(password);

      // Créez un nouveau membre
      const newPartner = await db.Partner.create({
        email,
        password: hashedPassword,
        role_id: 1,
        subscription_id: 1,
      });

      return newPartner;
    } catch (error) {
      throw error;
    }
  },
};

export default authService;
