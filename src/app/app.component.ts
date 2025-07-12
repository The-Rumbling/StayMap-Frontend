import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import {NavigationEnd, Router, RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
import {MatToolbar} from '@angular/material/toolbar';
import {MatButton, MatIconButton} from '@angular/material/button';
import {MatFormField, MatInput, MatLabel, MatSuffix} from '@angular/material/input';
import {debounceTime, distinctUntilChanged, filter, firstValueFrom, Subject, Subscription} from 'rxjs';
import {User} from './users/model/user.entity';
import {SearchService} from './shared/services/search.service';
import {FormsModule} from '@angular/forms';
import { AuthenticationService } from './iam/services/authentication.service';
import { UserService } from './users/services/user.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLinkActive, RouterLink, MatToolbar, MatFormField, MatLabel, MatButton, MatIconButton, MatInput, MatSuffix, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit, OnDestroy{
  private searchService = inject(SearchService)
  private userService = inject(UserService);

  currentUserId: number = 0;
  isLoggedIn: boolean = false;
  currentProfilePhoto: string = "";
  showToolbar = true;
  options = [
    {link: 'concerts', label: 'Concerts' },
    { link: 'map', label: 'Map' },
    { link: 'communities', label: 'Communities' },
  ];
  protected searchInput: string = "";
  private searchSubject = new Subject<string>();
  private searchSub!: Subscription;

  constructor(private translate:  TranslateService, private router: Router) {
    const userIdAux = localStorage.getItem("userId");
    if (userIdAux != null) {
      this.currentUserId = parseInt(userIdAux);
      this.userService.getById(this.currentUserId).subscribe(response => {
        this.currentProfilePhoto = response.profileImage;
        this.isLoggedIn = true;
      });
    }
    this.translate.setDefaultLang('en');
    this.translate.use('en');
    this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe((event: NavigationEnd) => {
      this.showToolbar = !(event.url.includes('/login') || event.url.includes('/register'));
    });
  }

  onSearchInput(value: string) {
    this.searchInput = value;
    this.searchSubject.next(value);
  }

  ngOnDestroy(): void {
    this.searchSub.unsubscribe();
  }

  ngOnInit(): void {
    this.searchSub = this.searchSubject
      .pipe(
        debounceTime(200),
        distinctUntilChanged()
      )
      .subscribe((term) => {
        this.searchService.setSearchTerm(term);
      });
  }
}
