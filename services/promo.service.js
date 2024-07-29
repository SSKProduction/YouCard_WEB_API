import db from "../models/index.js";

const promoService = {
  create: async (dataPromo) => {
    try {
      const newPromo = await db.Promo.create(dataPromo);
      return newPromo;
    } catch (error) {
      console.error("Erreur lors de la création de la promotion :", error);
      throw error;
    }
  },
};
export default promoService;
