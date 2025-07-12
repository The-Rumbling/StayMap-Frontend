/**
 * Model for sign up request
 */
export class SignUpRequest {
  public username: string;
  public password: string;
  public type: string;
  public profileImage: string;

  /**
   * Constructor.
   * @param username The username.
   * @param password The password.
   */
  constructor(username: string, password: string, type: string, profileImage: string) {
    this.password = password;
    this.username = username;
    this.type =  type;
    this.profileImage = profileImage;
  }
}
