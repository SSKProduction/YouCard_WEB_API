"use strict";

import { DataTypes, Sequelize } from "sequelize";

/** contactPartner model
 * @param {Sequelize} sequelize
 * @returns
 */
export default (sequelize) => {
  const ContactPartner = sequelize.define(
    "contactPartner",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      firstname: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lastname: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email_contact_partner: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      phone: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      tableName: "contactPartner",
      timestamps: false,
    }
  );
  return ContactPartner;
};
