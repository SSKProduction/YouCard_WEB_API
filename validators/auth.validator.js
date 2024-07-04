"use strict";
import * as yup from "yup";

const pwdRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^\w\d\s]).{8,}$/;

export const memberLoginValidator = yup.object().shape({
  email: yup
    .string()
    .typeError("L'email est invalide")
    .email("le format ne correspond pas a un email")
    .required("L'email est obligatoire"),

  password: yup.string().typeError("Le mot de passe est invalide"),
});
// same as member validator update but not required
export const memberRegisterValidator = yup.object().shape({
  email: yup
    .string()
    .typeError("L'email est invalide")
    .email("le format ne correspond pas a un email")
    .required("L'email est obligatoire"),
  password: yup
    .string()
    .typeError("Le mot de passe est invalide")
    .matches(
      pwdRegex,
      "Votre mot de passe doit contenir au moins 8 caractères, incluant une majuscule, une minuscule, un chiffre et un caractère spécial."
    )
    .required("Le mot de passe est obligatoire"),
  confirmPassword: yup
    .string()
    .typeError("Le mot de passe de confirmation est invalide")
    .required("Le mot de passe de confirmation est obligatoire")
    .oneOf([yup.ref("password")], "Les mots de passe doivent correspondre"),
});
// Schéma Yup pour le formulaire du partenaire
export const partnerSchema = yup.object().shape({
  name: yup.string().required("Le nom du partenaire est obligatoire"),
  email_partner: yup
    .string()
    .email("L'email du partenaire est invalide")
    .required("L'email du partenaire est obligatoire"),
  password: yup
    .string()
    .required("Le mot de passe est obligatoire")
    .matches(
      pwdRegex,
      "Le mot de passe doit contenir au moins 8 caractères, une majuscule, une minuscule, un chiffre et un caractère spécial"
    ),
  address_country: yup.string().required("Le pays est obligatoire"),
  address_city: yup.string().required("La ville est obligatoire"),
  address_street: yup.string().required("La rue est obligatoire"),
  address_street_number: yup
    .string()
    .required("Le numéro de rue est obligatoire"),
  address_postcode: yup.string().required("Le code postal est obligatoire"),
  URL_website: yup.string().required("L'URL du site web est obligatoire"),
  TVA_number: yup.string().required("Le numéro de TVA est obligatoire"),
});

export const contactSchema = yup.object().shape({
  firstname: yup.string().required("Le prénom est obligatoire"),
  lastname: yup.string().required("Le nom de famille est obligatoire"),
  email_contact_partner: yup
    .string()
    .email("L'email du contact est invalide")
    .required("L'email du contact est obligatoire"),
});

export const partnerRegisterValidator = yup.object().shape({
  partner: partnerSchema,
  contact: contactSchema,
});
