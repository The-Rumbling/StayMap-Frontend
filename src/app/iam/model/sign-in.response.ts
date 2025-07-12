export class SignInResponse {
  public id: number;
  public username: string;
  public token: string;
  public type: string;
  public profileImage: string;

  constructor(id: number, username: string, type: string, profileImage: string,  token: string) {
    this.token = token;
    this.username = username;
    this.id = id;
    this.type = type;
    this.profileImage = profileImage;
  }
}
