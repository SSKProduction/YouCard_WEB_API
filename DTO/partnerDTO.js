export class PartnerDTO {
  constructor({
    id,
    name,
    email_partner,
    phone,
    image_profile,
    url_website,
    contact_id,
  }) {
    this.id = id;
    this.name = name;
    this.email_partner = email_partner;
    this.phone = phone;
    this.image_profile = image_profile;
    this.url_website = url_website;
    this.contact_id = contact_id;
  }
}
