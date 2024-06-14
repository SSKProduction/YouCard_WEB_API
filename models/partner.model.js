"use strict";

import { DataTypes, Sequelize } from "sequelize";

/** partner model
 * @param {Sequelize} sequelize
 * @returns
 */
export default (sequelize) => {
  const Partner = sequelize.define(
    "partner",
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
      address_country: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      address_city: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      address_street: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      address_street_number: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      address_postcode: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      image_profile: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      contact_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
    },
    {
      tableName: "partner",
      timestamps: false,
    }
  );
  return Partner;
};
