import * as yup from "yup";

export const partnerUpdate = yup.object().shape({
  name: yup.string().required("Le nom du partenaire est obligatoire"),
  email_partner: yup
    .string()
    .email("L'email du partenaire est invalide")
    .required("L'email du partenaire est obligatoire"),
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
