import { Component, inject, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../model/user.entity';
import { Router, RouterLink } from '@angular/router';
import { Concert } from '../../../concerts/model/concert.entity';
import { DateParser } from '../../../shared/services/date-parser.service';
import { NgForOf, NgIf } from '@angular/common';
import {MatDialog} from '@angular/material/dialog';
import {
  UserProfileEditComponentComponent
} from '../../components/user-profile-edit.component/user-profile-edit.component.component';

import {
  ConcertMetricsDialogComponent
} from '../../../concerts/components/concert-metrics-dialog/concert-metrics-dialog.component';
import { AuthenticationService } from '../../../iam/services/authentication.service';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [
    NgIf,
    NgForOf,
    RouterLink,
  ],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css'
})
export class UserProfileComponent implements OnInit {
  currentUser: User = new User({});

  concertsAssisted: Concert[] = [];
  upcomingConcerts: Concert[] = [];

  private userService = inject(UserService);
  private authService = inject(AuthenticationService);

  constructor(private dialog: MatDialog) {}

  ngOnInit(): void {
    this.loadUser();
  }

  private loadUser(): void{
    var aux = localStorage.getItem("userId");
    if (aux != null) {
      this.currentUser.id = parseInt(aux);
      this.userService.getDetailsById(this.currentUser.id).subscribe(user => {
        this.currentUser.name = user.username;
        this.currentUser.type = user.type;
        this.currentUser.profileImage = user.profileImage;
        this.currentUser.communitiesJoined = user.communitiesJoined;
        this.upcomingConcerts = user.upcomingConcerts;
        this.currentUser.postsDone = user.postsDone;
        this.currentUser.createdConcerts = user.createdConcerts;
      })
    }
  }

  onLogout(): void {
    this.authService.signOut();
  }

  onEditProfile() {
    this.dialog.open(UserProfileEditComponentComponent, {
      panelClass: 'custom-dialog-container',
      data: { user: this.currentUser }
    }).afterClosed().subscribe((updatedUser: User) => {
      if (updatedUser)
        this.userService.update(updatedUser.id, {username: updatedUser.name, profileImage: updatedUser.profileImage}).subscribe(() => {this.loadUser();});
    });
  }

  protected openConcertMetricsDialog(concert: Concert): void {
    this.dialog.open(ConcertMetricsDialogComponent, {
      data:{concert}
    })
  }

  protected parseDate(date: string) {
    return DateParser.toSpanishLongDate(date);
  }
}
