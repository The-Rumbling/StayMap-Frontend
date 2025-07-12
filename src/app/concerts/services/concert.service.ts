import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment';
import {BaseService} from '../../shared/services/base.service';

const concertResourceEndpoint = environment.concertsEndpointPath || '';

@Injectable({
  providedIn: 'root'
})
export class ConcertService extends BaseService<any>{
  constructor() {
    super();
    this.resourceEndpoint = concertResourceEndpoint;
  }

  public confirmAttendance(concertId: number, userId: number) {
    if (concertId <= 0) console.log("ConcertId must be greater than 0");
    if (userId <= 0) console.log("UserId must be greater than 0");

    return this.http.post(`${this.resourcePath()}/${concertId}/attend?userId=${userId}`, {}, this.httpOptions);
  }

  public cancelAttendance(concertId: number, userId: number) {
    if (concertId <= 0) console.log("ConcertId must be greater than 0");
    if (userId <= 0) console.log("UserId must be greater than 0");

    return this.http.delete(`${this.resourcePath()}/${concertId}/attend?userId=${userId}`, this.httpOptions);
  }

  public checkAttendanceByUserId(concertId: number, userId: number) {
    if (concertId <= 0) console.log("ConcertId must be greater than 0");
    if (userId <= 0) console.log("UserId must be greater than 0");

    return this.http.get<boolean>(`${this.resourcePath()}/${concertId}/attendees?userId=${userId}`, this.httpOptions);
  }
}
