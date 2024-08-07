"use strict";

import { DataTypes, Sequelize } from "sequelize";

/** promo model
 * @param {Sequelize} sequelize
 * @returns
 */
export default (sequelize) => {
  const Promo = sequelize.define(
    "promo",
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
      description: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      image_url: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      type: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      discount: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      is_permanent: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
      },
      start_date: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      end_date: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      available: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
      },
      partner_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      subscription_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
    },
    {
      tableName: "promo",
      timestamps: false,
    }
  );
  return Promo;
};
