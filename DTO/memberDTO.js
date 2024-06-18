export class MemberDTO {
  constructor({ id, firstname, lastname, email, role_id, subscription_id }) {
    this.id = id;
    this.firstname = firstname;
    this.lastname = lastname;
    this.email = email;
    this.role_id = role_id;
    this.subscription_id = subscription_id;
  }
}
