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
  update: async (id, updateData) => {
    const transaction = await db.sequelize.transaction();
    try {
      const member = await db.Member.findOne({ where: { id } });

      if (!member) {
        await transaction.rollback();
        return null;
      }

      await member.update(updateData, { transaction });
      await transaction.commit();
      return !!member ? new MemberDTO(member) : null;
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  },
};
export default memberService;
