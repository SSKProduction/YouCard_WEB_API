"use strict";
import { Sequelize } from "sequelize";
import contactPartnerBuilder from "./contactPartner.model.js";
import memberBuilder from "./member.model.js";
import partnerBuilder from "./partner.model.js";
import promoBuilder from "./promo.model.js";
import roleBuilder from "./role.model.js";
import subscriptionBuilder from "./subscription.model.js";

const { DB_NAME, DB_USER, DB_PASSWORD, DB_HOST, DB_PORT, DB_DIALECT } =
  process.env;

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  host: DB_HOST,
  port: DB_PORT,
  dialect: DB_DIALECT,
});

const db = {};

db.sequelize = sequelize;
db.Member = memberBuilder(sequelize);
db.Partner = partnerBuilder(sequelize);
db.Promo = promoBuilder(sequelize);
db.Subscription = subscriptionBuilder(sequelize);
db.Role = roleBuilder(sequelize);
db.ContactPartner = contactPartnerBuilder(sequelize);

// Relation entre Member et Role
db.Member.belongsTo(db.Role, {
  foreignKey: "role_id",
});
db.Role.hasMany(db.Member, {
  foreignKey: "role_id",
});

// Relation entre Member et Subscription
db.Member.belongsTo(db.Subscription, {
  foreignKey: "subscription_id",
});
db.Subscription.hasMany(db.Member, {
  foreignKey: "subscription_id",
});

// Relation entre Promo et Partner
db.Promo.belongsTo(db.Partner, {
  foreignKey: "partner_id",
});
db.Partner.hasMany(db.Promo, {
  foreignKey: "partner_id",
});

// Relation entre Partner et ContactPartner
db.Partner.hasOne(db.ContactPartner, {
  foreignKey: "contact_id",
});
db.ContactPartner.belongsTo(db.Partner, {
  foreignKey: "contact_id",
});

export default db;
