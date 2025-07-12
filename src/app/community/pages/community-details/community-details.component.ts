import {Component, inject, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Community} from '../../model/community.entity';
import {CommunityService} from '../../services/community.service';
import {MatToolbarRow} from '@angular/material/toolbar';
import {MatButton} from '@angular/material/button';
import {CommunityPostListComponent} from '../../components/community-post-list/community-post-list.component';
import {PostService} from '../../services/post.service';
import {Post} from '../../model/post.entity';
import {NgClass} from '@angular/common';
import {PostCreateAndEditComponent} from '../../components/post-create-and-edit/post-create-and-edit.component';
import { AuthenticationService } from '../../../iam/services/authentication.service';
import { UserService } from '../../../users/services/user.service';

@Component({
  selector: 'app-community-details',
  imports: [
    MatToolbarRow,
    MatButton,
    CommunityPostListComponent,
    NgClass,
    PostCreateAndEditComponent,
  ],
  templateUrl: './community-details.component.html',
  styleUrl: './community-details.component.css'
})
export class CommunityDetailsComponent implements OnInit {
  private communityService = inject(CommunityService);
  private userService = inject(UserService);
  private postService = inject(PostService);
  private authService = inject(AuthenticationService);

  protected userId: number = 0;
  protected members: Array<any> = [];
  protected community = new Community({});
  protected posts: Post[] = [];
  protected alreadyJoined: boolean = false;
  protected hoveringJoinBtn: boolean = false;
  protected isPostsBtnActive: boolean = true;
  protected newPost: Post = new Post({});
  protected isEditMode: boolean = false;
  protected isPostFormVisible: boolean = false;
  protected showMembersDialog: boolean = false;

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    var aux = localStorage.getItem('userId')
    if (aux) this.userId = parseInt(aux);
    this.route.paramMap.subscribe(params => {
      const communityIdStr = params.get('id');
      const communityId = communityIdStr ? +communityIdStr : null;
      if (communityId) {
        this.communityService.getById(communityId).subscribe(community => {
          if (community.members.includes(this.userId)) {
            this.alreadyJoined = true;
          }
          this.community = community
          this.postService.getByCommunityId(this.community.id).subscribe(posts => this.posts = posts.reverse());
        });
      }
    });
  }

  protected onGoBackClicked(): void {
    this.router.navigate(['/communities']).then();
  }

  protected onJoinClicked(): void {
    if (this.alreadyJoined) {
      this.leaveCommunity();
    } else {
      this.joinCommunity();
    }
  }

  private joinCommunity(): void {
    if (this.userId <= 0) {
      console.log("Error: Invalid userId")
      return;
    }

    this.communityService.joinCommunity(this.community.id, this.userId).subscribe(() => {
      this.communityService.getById(this.community.id).subscribe(community => {
        this.community = community;
        this.alreadyJoined = true;
      });
    });
  }

  private leaveCommunity(): void {
    if (this.userId <= 0) {
      console.log("Error: Invalid userId")
      return;
    }

    this.communityService.leaveCommunity(this.community.id, this.userId).subscribe(() => {
      this.communityService.getById(this.community.id).subscribe(community => {
        this.community = community;
        this.alreadyJoined = false;
      });
    });
  }

  private createPost() {
    this.isPostFormVisible = false;

    if (this.userId <= 0 || this.userId == null) {
      console.log("Error: Invalid userId");
      console.log(this.newPost);
      return;
    }

    this.postService.create({...this.newPost, userId: this.userId, communityId: this.community.id}).subscribe(() => {
      this.communityService.getById(this.community.id).subscribe(community => {
        this.postService.getByCommunityId(this.community.id).subscribe(posts => {
          this.posts = posts.reverse();
          this.community = community;
        });
      });
    });
  }

  //POST FORM METHODS
  protected onCancelClicked(): void {
    this.isPostFormVisible = false;
  }

  protected onPostAddRequested(): void {
    this.createPost();
  }

  protected onPostUpdateRequested() {}

  protected onViewMembersClicked(): void {
    this.userService.getByCommunityId(this.community.id).subscribe(response => {
      this.members = response;
      console.log(this.members);
      this.showMembersDialog = true;
    });
  }

  protected closeDialog(): void {
    this.showMembersDialog = false;
  }
}
