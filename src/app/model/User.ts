export class User {

  public email: string;
  public token: string;
  public username: string;

  constructor(user: User) {
    this.email = user.email;
    this.token = user.token;
    this.username = user.username;
  }
}
