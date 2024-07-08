import { contactPartnerDTO } from "../DTO/contactPartnerDTO.js";
import db from "../models/index.js";

const contactPartner = {
  add: async (contactPartnerData) => {
    const contactPartner = await db.ContactPartner.create(contactPartnerData);
    return new contactPartnerDTO(contactPartner);
  },
  delete: async (id) => {
    const transaction = await db.sequelize.transaction();
    try {
      const contactPartner = await db.ContactPartner.findOne({ where: { id } });

      if (!contactPartner) {
        throw new Error("La personne de contact est introuvable.");
      }
      await contactPartner.destroy({ transaction });
      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  },
};
export default contactPartner;
