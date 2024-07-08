import { PartnerDTO } from "../DTO/partnerDTO.js";
import db from "../models/index.js";

const partnerService = {
  getOne: async (id) => {
    const partner = await db.Partner.findOne({ where: { id } });

    try {
      if (!partner) {
        return null;
      }
      return !!partner ? new PartnerDTO(partner) : null;
    } catch (error) {
      throw new Error("Le partenaire est introuvable");
    }
  },
  getAll: async () => {
    const partners = await db.Partner.findAll();

    try {
      if (!partners) {
        return null;
      }
      return partners;
    } catch (error) {
      throw new Error("Les partenaires sont introuvable");
    }
  },
  update: async (id, updateData) => {
    const transaction = await db.sequelize.transaction();
    try {
      const partner = await db.Partner.findOne({ where: { id }, transaction });

      if (!partner) {
        await transaction.rollback();
        return null;
      }

      await partner.update(updateData, { transaction });
      await transaction.commit();
      return !!partner ? new PartnerDTO(partner) : null;
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  },
  delete: async (id) => {
    const transaction = await db.sequelize.transaction();
    try {
      const partner = await db.Partner.findOne({ where: { id } });

      if (!partner) {
        throw new Error("Le membre est introuvable.");
      }

      await partner.destroy({ transaction });
      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  },
};
export default partnerService;
