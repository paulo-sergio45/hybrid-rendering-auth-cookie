import { User } from "./User";

export class Login {
 public message: string;
public token: string;
public user:User;
  constructor(login: Login) {
    this.message = login.message;
    this.token = login.token;
    this.user = login.user;
  }
}
