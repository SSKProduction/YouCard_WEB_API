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
};
export default partnerService;
