import { Component, OnInit, Input } from '@angular/core';
import { ApplicationUser } from 'src/app/core/classes/user';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Subscription} from 'rxjs';

@Component({
  selector: 'osg-profile-cover',
  templateUrl: './profile-cover.component.html'
})
export class ProfileCoverComponent implements OnInit{

  @Input() applicationUser: any;
  avatar: string;
  isdefault: boolean;
  isfriend: string;

  constructor(private http: HttpClient) {}
  ngOnInit(): void {
    if (this.applicationUser.profile != null && this.applicationUser.profile.avatar != '' && this.applicationUser.profile.avatar != null) {
      this.avatar = this.applicationUser.profile.avatar;
      this.isdefault = false;
    } else {
      this.avatar = '/assets/images/icons/icon-profile-big.png';
      this.isdefault = true;
      this.isfriend = '0';
    }

    if (this.applicationUser.profile != null)
      this.isfriend = this.applicationUser.profile.is_friend;
    else
      this.isfriend = '0';
  }

  get fullName(){
    return this.applicationUser.profile !== undefined ? this.applicationUser.profile.name : '';
  }

  requestFriend() {
    this.http.post('profile/requestFriend', { friend_id: this.applicationUser.profile.user_id })
      .subscribe(resp => {
        this.isfriend = '1';
      });
  }
}
