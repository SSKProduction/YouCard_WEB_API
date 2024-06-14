"use strict";

import { DataTypes, Sequelize } from "sequelize";

/** member model
 * @param {Sequelize} sequelize
 * @returns
 */
export default (sequelize) => {
  const Member = sequelize.define(
    "member",
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
      birthdate: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      address_country: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      address_city: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      address_street: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      address_street_number: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      address_postcode: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      googleId: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: true,
      },
      image_profile: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      role_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      subscription_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      tableName: "member",
      timestamps: false,
    }
  );
  return Member;
};
