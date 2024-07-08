import memberService from "../services/member.service.js";

const memberController = {
  getOne: async (req, res) => {
    const id = req.params.id;
    const member = await memberService.getOne(id);

    if (!member) {
      res.sendStatus(404);
      return;
    }
    res.status(200).json(member);
  },
  update: async (req, res) => {
    const id = req.params.id;
    const updateData = req.body;
    try {
      const updatedDataMember = await memberService.update(id, updateData);
      if (!updatedDataMember) {
        return res.status(404).send({ message: "Membre non trouvé." });
      }
      res.send(updatedDataMember);
    } catch (error) {
      res.status(400).send({ message: error.message });
    }
  },

  updatePassword: async (req, res) => {
    const id = req.params.id;
    console.log("username :", id);
    const currentPassword = req.body.currentPassword;
    console.log(currentPassword);
    const newPwd = req.body.password;
    console.log("new pwd :", newPwd);

    try {
      const verifyCurrentPassword = await memberService.verifyCurrentPassword(
        id,
        currentPassword
      );

      if (!verifyCurrentPassword) {
        return res
          .status(401)
          .send({ message: "Mot de passe actuel incorrect." });
      }
      const updatePwd = await memberService.updatePassword(id, newPwd);
      console.log("updatePwd :", updatePwd);
      if (!updatePwd) {
        return res
          .status(404)
          .send({ message: "Echec de la mise a jour du mot de passe." });
      }
      res.sendStatus(200);
    } catch (error) {
      res.status(400).send(error.message);
    }
  },
  delete: async (req, res) => {
    const id = req.params.id;

    await memberService.delete(id);

    res.sendStatus(200);
  },
};

export default memberController;
