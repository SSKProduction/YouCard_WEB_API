import db from "../models/index.js";

const promoService = {
  getById: async (id) => {
    const promo = await db.Promo.findByPk(id);
    return promo;
  },

  getBySubscription: async (subId) => {
    const promo = await db.Promo.findAll({ where: { subscription_id: subId } });
    return promo;
  },

  getByPartner: async (partnerId) => {
    const promo = await db.Promo.findAll({ where: { partner_id: partnerId } });
    return promo;
  },

  getAll: async () => {
    try {
      const promo = await db.Promo.findAll();
      console.log(promo);
      return promo;
    } catch (error) {
      console.error("Erreur lors de la recupération :", error);
      throw error;
    }
  },

  create: async (dataPromo) => {
    console.log("les datas : ", dataPromo);
    try {
      const newPromo = await db.Promo.create(dataPromo);
      return newPromo;
    } catch (error) {
      console.error("Erreur lors de la création de la promotion :", error);
      throw error;
    }
  },

  update: async (promoId, updateData) => {
    const transaction = await db.sequelize.transaction();
    try {
      console.log("IDDDDDDDDD : ", promoId);
      const promo = await db.Promo.findOne({ where: { id: promoId } });

      if (!promo) {
        await transaction.rollback();
        return null;
      }

      await promo.update(updateData, { transaction });
      await transaction.commit();
      return promo;
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  },

  delete: async (id) => {
    const transaction = await db.sequelize.transaction();
    try {
      const promo = await db.Promo.destroy({
        where: { id },
        transaction,
      });
      await transaction.commit();
      return promo;
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  },
};
export default promoService;
