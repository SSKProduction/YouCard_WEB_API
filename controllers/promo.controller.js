import promoService from "../services/promo.service.js";

const promoController = {
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
};
export default promoController;
