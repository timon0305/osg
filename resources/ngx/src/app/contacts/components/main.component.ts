import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'osg-contacts',
  templateUrl: './main.component.html'
})
export class ContactsComponent implements OnInit{

  defaultAvatar: string = '/assets/images/icons/icon-account-gray.png';
  friends: Object;
  total_cnt = 0;
  is_type = 0;

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit():void {
    this.getFriends(0);
  }

  getFriends(type){
    this.http.post('contacts/getFriends', {is_type : type})
    .subscribe(resp => {
      this.total_cnt = resp['total_cnt'];
      this.friends = resp['friends'];
      this.is_type = type;
    });
  }

  viewProfile(friendId){
    this.router.navigate(['/profile', friendId]);
  }

  acceptFriend(friendId) {
    this.http.post('contacts/acceptFriend', { friend_id: friendId })
      .subscribe(resp => {
        this.getFriends(1);
      });
  }

}
