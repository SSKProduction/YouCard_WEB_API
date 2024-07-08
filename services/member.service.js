import argon2 from "argon2";
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
  verifyCurrentPassword: async (id, currentPassword) => {
    const member = await db.Member.findOne({ where: { id } });

    if (!member) {
      throw new Error("L'utilisateur est introuvable.");
    }

    const isMatch = await argon2.verify(member.password, currentPassword);
    return isMatch;
  },
  updatePassword: async (id, newPwd) => {
    const transaction = await db.sequelize.transaction();

    try {
      const member = await db.Member.findOne({ where: { id } });

      if (!member) {
        await transaction.rollback();
        return null;
      }
      const newHashPwd = await argon2.hash(newPwd);

      await member.update({ password: newHashPwd }, { transaction });
      await transaction.commit();
      return true;
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  },
  delete: async (id) => {
    const transaction = await db.sequelize.transaction();
    try {
      const member = await db.Member.findOne({ where: { id } });
      console.log("le member a delete : ", member);

      if (!member) {
        throw new Error("Le membre est introuvable.");
      }

      await member.destroy({ transaction });
      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  },
};
export default memberService;
