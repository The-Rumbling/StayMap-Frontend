import {Component, inject} from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {AuthenticationService} from '../../../iam/services/authentication.service';
import {SignInRequest} from '../../../iam/model/sign-in.request';

@Component({
  selector: 'app-login',
  imports: [FormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  email: string = "";
  password: string = "";
  authService = inject(AuthenticationService);

  constructor() {}

  onLogin() {
    const signInRequest = new SignInRequest(this.email, this.password);
    this.authService.signIn(signInRequest)
  }
}
