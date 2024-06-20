import * as yup from "yup";

const pwdRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^\w\d\s]).{8,}$/;

export const memberUpdateValidator = yup.object().shape({
  firstname: yup
    .string()
    .typeError("Le prénom est invalide")
    .required("Le prénom est obligatoire"),
  lastname: yup
    .string()
    .typeError("Le nom est invalide")
    .required("Le nom est obligatoire"),
  birthdate: yup.date().typeError("La date de naissance est invalide"),
  address_country: yup.string().typeError("Le pays est invalide"),
  address_city: yup.string().typeError("La ville est invalide"),
  address_street: yup.string().typeError("La rue est invalide"),
  address_street_number: yup
    .string()
    .typeError("Le numero de rue est invalide"),
  address_postcode: yup.string().typeError("Le code postale rue est invalide"),
  email: yup
    .string()
    .typeError("L'email est invalide")
    .required("L'email est obligatoire"),
  role_id: yup.string().typeError("Le role est invalide"),
});
