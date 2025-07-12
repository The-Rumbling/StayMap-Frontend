import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {BaseService} from '../../shared/services/base.service';
import {User} from '../model/user.entity';
import {BehaviorSubject, catchError, map, retry} from 'rxjs';

const usersResourceEndpointPath = environment.usersEndpointPath || '';

@Injectable({
  providedIn: 'root'
})
export class UserService extends BaseService<any> {
  private currentUserSubject = new BehaviorSubject<any>(this.getCurrentUser());
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor() {
    super();
    this.resourceEndpoint = usersResourceEndpointPath;
  }

  public getByCommunityId(communityId: number) {
    return this.http.get<Array<any>>(`${this.resourcePath()}?communityId=${communityId}`)
  }

  public getDetailsById(userId: number) {
    return this.http.get<any>(`${this.resourcePath()}/${userId}/details`)
  }

  login(email:string, password:string) {
    return this.http.get<User[]>(`${this.resourcePath()}?email=${email}&password=${password}`, this.httpOptions).pipe(
      retry(2), catchError(this.handleError), map(users => {
        if (users.length) {
          const user = users[0];
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.currentUserSubject.next(user);
          return user;
        }
        return null;
      })
    );
  }


  logout() {
    sessionStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }

  getCurrentUser() {
    return JSON.parse(sessionStorage.getItem('currentUser') || 'null');
  }
}
