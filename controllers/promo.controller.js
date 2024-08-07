import promoService from "../services/promo.service.js";

const promoController = {
  getById: async (req, res) => {},
  getBySubscription: async (req, res) => {
    const subId = req.params.id;
    const promo = await promoService.getBySubscription(subId);
    res.status(200).json(promo);
  },

  getByPartner: async (req, res) => {
    const partnerId = req.params.id;
    const promo = await promoService.getByPartner(partnerId);
    res.status(200).json(promo);
  },

  getAll: async (req, res) => {
    const promo = await promoService.getAll();
    res.status(200).json(promo);
  },

  create: async (req, res) => {
    const dataPromo = req.body;
    console.log("Données reçues :", dataPromo);
    try {
      const promo = await promoService.create(dataPromo);
      res.status(201).json(promo);
    } catch (error) {
      console.error("Erreur lors de la création de la promotion :", error);
      res.status(500).json({ message: "Erreur interne du serveur" });
    }
  },
  update: async (req, res) => {
    try {
      const updateData = req.body;
      const promoId = req.params.id;
      const promo = await promoService.update(promoId, updateData);
      return res.status(200).json(promo);
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        message:
          "Une erreur est survenue lors de la mise à jour de la promotion.",
      });
    }
  },

  delete: async (req, res) => {
    const promoId = req.params.id;
    try {
      const promo = await promoService.delete(promoId);
      return res.status(200).json(promo);
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({
          message:
            "Une erreur est survenue lors de la suppression de la promotion.",
        });
    }
  },
};
export default promoController;
