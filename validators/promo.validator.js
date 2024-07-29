import * as yup from "yup";

export const promo = yup.object().shape({
  name: yup.string().required("Le nom est requis."),
  description: yup.string().required("La description est requise."),
  type: yup.string().required("Le type est requis."),
  discount: yup.number().typeError("La remise doit être un nombre."),
  is_permanent: yup.boolean().required("Le statut permanent est requis."),
  image_url: yup.string().required("L'URL de l'image est requise."),
  start_date: yup
    .string()
    .typeError("La date de début doit être une date valide."),
  end_date: yup.string().typeError("La date de fin doit être une date valide."),
  available: yup.boolean().required("La disponibilité est requise."),
  partner_id: yup.number().required("L'ID du partenaire est requis."),
  subscription_id: yup.number().required("L'ID de l'abonnement est requis."),
});
