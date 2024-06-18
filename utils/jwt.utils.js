"use strict";
import jwt from "jsonwebtoken";

export const generateJwt = ({
  id,
  firstname,
  lastname,
  email,
  role_id,
  subscription_id,
}) => {
  const data = { id, firstname, lastname, email, role_id, subscription_id };
  const secret = process.env.JWT_SECRET;
  const options = {
    algorithm: "HS512",
    expiresIn: "12h",
    audience: process.env.JWT_AUDIENCE,
    issuer: process.env.JWT_ISSUER,
  };

  return jwt.sign(data, secret, options);
};

export const decodeJwt = (token) => {
  return new Promise((resolve, reject) => {
    const secret = process.env.JWT_SECRET;
    const options = {
      audience: process.env.JWT_AUDIENCE,
      issuer: process.env.JWT_ISSUER,
    };

    jwt.verify(token, secret, options, (error, data) => {
      if (error) {
        reject(error);
        return;
      }

      resolve(data);
    });
  });
};
