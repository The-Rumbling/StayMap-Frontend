export class SignUpResponse {
  public id: number;
  public username: string;
  public type: string;
  public profileImage: string;

  constructor(id: number, username: string, type: string, profileImage: string) {
    this.username = username;
    this.id = id;
    this.type = type;
    this.profileImage = profileImage;
  }
}
