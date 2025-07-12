import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {BehaviorSubject} from "rxjs";
import {Router} from "@angular/router";
import {environment} from '../../../environments/environment';
import {SignUpRequest} from '../model/sign-up.request';
import {SignUpResponse} from '../model/sign-up.response';
import {SignInRequest} from '../model/sign-in.request';
import {SignInResponse} from '../model/sign-in.response';

@Injectable({providedIn: 'root'})
export class AuthenticationService {
  private basePath: string = `${environment.serverBaseUrl}`;
  private httpOptions = {headers: new HttpHeaders({'Content-Type': 'application/json'})};

  private signedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private signedInUserId: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  private signedInUsername: BehaviorSubject<string> = new BehaviorSubject<string>('');
  private signedInProfilePhoto: BehaviorSubject<string> = new BehaviorSubject<string>("");
  private signedInType: BehaviorSubject<string> = new BehaviorSubject<string>("");

  constructor(private router: Router, private http: HttpClient) {
  }

  get isSignedIn() {
    return this.signedIn.asObservable();
  }

  get currentUserId() {
    return this.signedInUserId.asObservable();
  }

  get currentUsername() {
    return this.signedInUsername.asObservable();
  }

  get currentProfilePhoto() {
    return this.signedInProfilePhoto.asObservable();
  }

  get currentType() {
    return this.signedInType.asObservable();
  }

  public signUp(signUpRequest: SignUpRequest) {
    return this.http.post<SignUpResponse>(`${this.basePath}/authentication/sign-up`, signUpRequest, this.httpOptions)
      .subscribe({
        next: (response) => {
          console.log(`Signed up as ${response.username} with id ${response.id}`);
          this.router.navigate(['/login']).then(() => location.reload());
        }
      });
  }

  public signIn(signInRequest: SignInRequest) {
    console.log(signInRequest);
    return this.http.post<SignInResponse>(`${this.basePath}/authentication/sign-in`, signInRequest, this.httpOptions)
      .subscribe({
        next: (response) => {
          this.signedIn.next(true);
          this.signedInUserId.next(response.id);
          this.signedInUsername.next(response.username);
          this.signedInProfilePhoto.next(response.profileImage);
          this.signedInType.next(response.type);
          localStorage.setItem('userId', response.id.toString());
          localStorage.setItem('token', response.token);
          console.log(`Signed in as ${response.username} with token ${response.token}`);
          this.router.navigate(['/']).then(() => location.reload());
        },
        error: (error) => {
          this.signedIn.next(false);
          this.signedInUserId.next(0);
          this.signedInUsername.next('');
          this.signedInProfilePhoto.next("");
          this.signedInType.next("");
          console.error(`Error while signing in: ${error}`);
          this.router.navigate(['/login']).then(() => location.reload());
        }
      });
  }

  public signOut() {
    this.signedIn.next(false);
    this.signedInUserId.next(0);
    this.signedInUsername.next('');
    this.signedInProfilePhoto.next('');
    this.signedInType.next('');
    localStorage.clear();
    this.router.navigate(['/login']).then(() => location.reload());
  }

}
