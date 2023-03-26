export class User {
  public id: number|null;
  public name: string|null;
  public token: string|null;
  public email: string|null;

  public constructor({id = null, name = null, token = null, email = null} = {}) {
    this.id = id;
    this.name = name;
    this.token = token;
    this.email = email;
  }
}
