export class User {
   public id: string;
  public email: string;
  public username: string;
  // public createdAt: Date;
  // public updatedAt: Date;
  // public isActive: boolean;
  // public isAdmin: boolean;

  constructor(user: User) {
    this.id = user.id;
    this.email = user.email;
    this.username = user.username;
  }
}
