import partnerService from "../services/partner.service.js";

const partnerController = {
  getOne: async (req, res) => {
    const id = req.params.id;
    const partner = await partnerService.getOne(id);

    if (!partner) {
      res.sendStatus(404);
      return;
    }
    res.status(200).json(partner);
  },
  getAll: async (req, res) => {
    const partners = await partnerService.getAll();
    if (!partners) {
      res.sendStatus(404);
      return;
    }
    res.status(200).json(partners);
  },
  update: async (req, res) => {
    const id = req.params.id;
    const updateData = req.body;
    try {
      const updatedDataPartner = await partnerService.update(id, updateData);
      if (!updatedDataPartner) {
        return res.status(404).send({ message: "Partenaire non trouvé." });
      }
      res.send(updatedDataPartner);
    } catch (error) {
      res.status(400).send({ message: error.message });
    }
  },
};
export default partnerController;
