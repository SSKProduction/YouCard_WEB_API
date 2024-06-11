"use strict";

import { DataTypes, Sequelize } from "sequelize";

/** role model
 * @param {Sequelize} sequelize
 * @returns
 */
export default (sequelize) => {
  const Role = sequelize.define(
    "role",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      role: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      tableName: "role",
      timestamps: false,
    }
  );
  return Role;
};
