"use strict";

import { DataTypes, Sequelize } from "sequelize";

/** subscription model
 * @param {Sequelize} sequelize
 * @returns
 */
export default (sequelize) => {
  const Subscription = sequelize.define(
    "subscription",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      subscription: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      timestamps: false,
    }
  );
  return Subscription;
};
