import argon2 from "argon2";
import { MemberDTO } from "../DTO/memberDTO.js";
import { PartnerDTO } from "../DTO/partnerDTO.js";
import db from "../models/index.js";

const authService = {
  registerMember: async (
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
  ) => {
    try {
      // vérifier si l'email existe déjà dans la base de données
      const existingMember = await db.Member.findOne({ where: { email } });
      if (existingMember) {
        // si l'email est déjà utilisé, lancer une erreur
        throw new Error("L'email est déjà utilisé.");
      }
      console.log("LE PASSWORD", password);

      // hacher le mot de passe avant de le stocker
      const hashedPassword = await argon2.hash(password);

      // créer un nouveau membre dans la base de données
      const newMember = await db.Member.create({
        firstname,
        lastname,
        email,
        password: hashedPassword,
        birthdate,
        address_country,
        address_city,
        address_street,
        address_street_number,
        address_postcode,
        role_id: 1, // rôle par défaut pour les membres
        subscription_id: 1, // abonnement par défaut
      });

      // retourner le DTO du nouveau membre
      return new MemberDTO(newMember);
    } catch (error) {
      // en cas d'erreur, la relancer
      throw error;
    }
  },

  registerPartner: async (partnerData, contactData) => {
    // démarrer une transaction
    const t = await db.sequelize.transaction();
    try {
      // vérifier si l'email du partenaire existe déjà
      const existingPartner = await db.Partner.findOne(
        {
          where: { email_partner: partnerData.email_partner },
        },
        { transaction: t }
      );
      if (existingPartner) {
        // si l'email est déjà utilisé, lancer une erreur
        throw new Error("L'email du partenaire est déjà utilisé.");
      }

      // créer un nouveau contact pour le partenaire
      const newContact = await db.ContactPartner.create(contactData, {
        transaction: t,
      });
      console.log(newContact);

      // hacher le mot de passe du partenaire avant de le stocker
      const hashedPassword = await argon2.hash(partnerData.password);

      // créer un nouveau partenaire dans la base de données
      const newPartner = await db.Partner.create(
        {
          ...partnerData,
          password: hashedPassword,
          contact_id: newContact.id, // lier le contact créé au partenaire
        },
        { transaction: t }
      );

      // valider la transaction
      await t.commit();
      // retourner le DTO du nouveau partenaire
      return new PartnerDTO(newPartner);
    } catch (error) {
      // en cas d'erreur, annuler la transaction et la relancer
      await t.rollback();
      throw error;
    }
  },
};

export default authService;
