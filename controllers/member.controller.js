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
};

export default memberController;
