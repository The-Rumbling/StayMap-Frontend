import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment';
import {BaseService} from '../../shared/services/base.service';
import {Community} from '../model/community.entity';

const communityResourceEndPoint = environment.communityEndpointPath || '';

@Injectable({
  providedIn: 'root'
})
export class CommunityService extends BaseService<Community>{
  constructor() {
    super();
    this.resourceEndpoint = communityResourceEndPoint;
  }

  public joinCommunity(communityId: number, userId: number) {
    return this.http.post(`${this.resourcePath()}/${communityId}/join?userId=${userId}`, {}, this.httpOptions);
  }

  public leaveCommunity(communityId: number, userId: number) {
    return this.http.delete(`${this.resourcePath()}/${communityId}/leave?userId=${userId}`, this.httpOptions);
  }
}
