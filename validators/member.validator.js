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
  birthdate: yup
    .date()
    .typeError("La date de naissance est invalide")
    .required("La date de naissance est obligatoire"),
  address_country: yup
    .string()
    .typeError("Le pays est invalide")
    .required("Le pays est obligatoire"),
  address_city: yup
    .string()
    .typeError("La ville est invalide")
    .required("Le ville est obligatoire"),
  address_street: yup
    .string()
    .typeError("La rue est invalide")
    .required("La rue est obligatoire"),
  address_street_number: yup
    .string()
    .typeError("Le numero de rue est invalide")
    .required("Le numero de rue est obligatoire"),
  address_postcode: yup
    .string()
    .typeError("Le code postale rue est invalide")
    .required("Le code postale est obligatoire"),
  email: yup
    .string()
    .typeError("L'email est invalide")
    .required("L'email est obligatoire"),
  role_id: yup
    .string()
    .typeError("Le role est invalide")
    .required("Le role est obligatoire"),
});
