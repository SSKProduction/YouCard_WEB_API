import { contactPartnerDTO } from "../DTO/contactPartnerDTO.js";

const contactPartner = {
  add: async (contactPartnerData) => {
    const contactPartner = await db.ContactPartner.create(contactPartnerData);
    return new contactPartnerDTO(contactPartner);
  },
};
export default contactPartner;
