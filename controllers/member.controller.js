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

  updateMemberPassword: async (req, res) => {
    res.json("update member");
  },
  deleteMember: async (req, res) => {
    res.json("delete member");
  },
};

export default memberController;
