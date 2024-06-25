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
    // console.log("DATAAAAAAAA    : ", updateData);
    const transaction = await db.sequelize.transaction();
    try {
      const member = await db.Member.findOne({ where: { id }, transaction });

      if (!member) {
        await transaction.rollback();
        return null;
      }

      const fieldsToUpdate = [
        "firstname",
        "lastname",
        "birthdate",
        "address_country",
        "address_city",
        "address_street",
        "address_street_number",
        "address_postcode",
        "email",
      ];
      const filteredData = {};
      fieldsToUpdate.forEach((field) => {
        if (updateData[field] !== undefined) {
          filteredData[field] = updateData[field];
        }
      });

      await member.update(filteredData, { transaction });
      await transaction.commit();
      return !!member ? new MemberDTO(member) : null;
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  },
};
export default memberService;
