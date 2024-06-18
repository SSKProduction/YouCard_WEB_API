import { MemberDTO } from "../DTO/memberDTO.js";
import db from "../models/index.js";

const memberService = {
  getOne: async (id) => {
    const member = await db.Member.findOne({ where: { id } });

    try {
      if (!member) {
        return null;
      }
      return !!member ? new MemberDTO(member) : null;
    } catch (error) {
      throw new Error("L'utilisateur est introuvable");
    }
  },
};
export default memberService;
