import argon2 from "argon2";
import db from "../models/index.js";

const authService = {
  register: async (email, password) => {
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
        email,
        password: hashedPassword,
        role_id: 1,
      });

      return newMember;
    } catch (error) {
      throw error;
    }
  },
};

export default authService;
