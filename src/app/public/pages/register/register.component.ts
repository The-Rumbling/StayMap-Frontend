import {Component, inject} from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import {UserService} from '../../../users/services/user.service';
import {User} from '../../../users/model/user.entity';
import {FormsModule} from '@angular/forms';
import {NgIf} from '@angular/common';
import { UploadImageService } from '../../../shared/services/upload-image.service';
import { AuthenticationService } from '../../../iam/services/authentication.service';
import { SignUpRequest } from '../../../iam/model/sign-up.request';

@Component({
  selector: 'app-register',
  imports: [
    FormsModule,
    NgIf,
    RouterLink
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  protected userRegistered = false;
  protected userService = inject(UserService);
  private authService = inject(AuthenticationService);
  protected userData: User = new User({});
  isFan: boolean = false;

  constructor(){}

  protected onRegister() {
    this.userData.profileImage="https://media.istockphoto.com/id/1223671392/vector/default-profile-picture-avatar-photo-placeholder-vector-illustration.jpg?s=612x612&w=0&k=20&c=s0aTdmT5aU6b8ot7VKm11DeID6NctRCpB755rA1BIP0=";
    const request = new SignUpRequest(this.userData.email, this.userData.password, this.userData.type, this.userData.profileImage);
    console.log(this.userData);
    console.log(request);
    this.authService.signUp(request);
    this.userRegistered=true;
  }
}
