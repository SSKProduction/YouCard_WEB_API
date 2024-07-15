import contactPartnerService from "../services/contactPartner.service.js";

const contactPartnerController = {
  getOne: async (req, res) => {
    const id = req.params.id;
    const contactPartner = await contactPartnerService.getOne(id);

    if (!contactPartner) {
      res.sendStatus(404);
      return;
    }
    res.status(200).json(contactPartner);
  },
  getAll: async (req, res) => {
    const contactPartners = await partnerService.getAll();
    if (!contactPartners) {
      res.sendStatus(404);
      return;
    }
    res.status(200).json(contactPartners);
  },
  update: async (req, res) => {
    const id = req.params.id;
    const updateData = req.body;
    try {
      const updatedDataContactPartner = await contactPartnerService.update(
        id,
        updateData
      );
      if (!updatedDataContactPartner) {
        return res
          .status(404)
          .send({ message: "Personne de Contact du Partenaire non trouvé." });
      }
      res.send(updatedDataContactPartner);
    } catch (error) {
      res.status(400).send({ message: error.message });
    }
  },
  delete: async (req, res) => {
    const id = req.params.id;

    const contactPartner = await partnerService.getOne(id);

    await contactPartnerService.delete(contactPartner.contact_id);
    await contactPartnerService.delete(id);

    res.sendStatus(200);
  },
};

export default contactPartnerController;
