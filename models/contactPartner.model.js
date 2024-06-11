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
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
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
