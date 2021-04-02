import { Component, OnInit, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
import { ApplicationService } from '../../services/application.service';
import { Meta } from '@angular/platform-browser';
import { ApplicationUserRole } from '../../classes/user';
import { Router } from '@angular/router';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Subscription} from 'rxjs';

@Component({
  selector: 'osg-navigation',
  templateUrl: './navigation.component.html'
})
export class NavigationComponent implements OnInit {
  user: any;
  isMobile: any;
  isCollapsed: boolean;
  isSearch: boolean;
  isProfile: boolean;
  isNotification: boolean;
  searchText = '';
  searchUserResult: [];
  searchProgramResult: [];
  notifications = [];

  @ViewChild('logoutForm') logoutForm: ElementRef;
  constructor(private readonly applicationService: ApplicationService,
              private readonly meta: Meta,
              private router: Router,
              private http: HttpClient,
              private cdr: ChangeDetectorRef){
    if (ApplicationUserRole.StrengthAthlete) {
      this.isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    } else {
      this.isMobile = false;
    }
    this.isCollapsed = false;
    this.isSearch = false;
    this.isProfile = false;
    this.isNotification = false;
  }

  async ngOnInit() {
    this.user = await this.applicationService.authenticatedUser.toPromise();
    this.notifications = this.user.notifications;
  }

  get fullName() {
    return this.user !== undefined ? this.user.name : '';
  }

  get csrf() {
    return this.meta.getTag('name=csrf-token').content;
  }

  get role(): string {
    return this.user ? this.user.role : '';
  }


  get isPersonalTrainer(): boolean {
    return this.role === ApplicationUserRole.PersonalTrainer;
  }

  get isProgramDesigner(): boolean {
    return this.role === ApplicationUserRole.ProgramDesigner;
  }

  get isStrengthAthlete(): boolean {
    return this.role === ApplicationUserRole.StrengthAthlete;
  }

  logout() {
    this.logoutForm.nativeElement.submit();
  }

  link(link: string) {
    this.toggle();
    if (this.isProfile) {
      this.isProfile = false;
    }
    this.router.navigate([link]);
  }

  menu(link: string) {
    this.toggle();
    this.profile();
    this.router.navigate([link]);
  }

  toggle() {
    this.isCollapsed = !this.isCollapsed;
  }

  search() {
    this.isSearch = !this.isSearch;
    var searchText_len = 0;
    if(this.searchText)
      searchText_len = this.searchText.trim().length;

    // Check search text length
    if(searchText_len > 0){
      this.http.post('profile/search', {searchTxt : this.searchText})
        .subscribe(resp => {
          this.searchUserResult = resp['users'];
          this.searchProgramResult = resp['programs'];
        });
    }else{
      this.searchUserResult = [];
      this.searchProgramResult = [];
    }
  }

  searchboxClicked = function($event){
    $event.stopPropagation();
 }

  profile() {
    this.isProfile = !this.isProfile;
  }

  notification() {
    this.isNotification = !this.isNotification;
  }

  profileView(userId: string) {
    this.searchText = '';
    this.isSearch = false;
    // this.user = await this.applicationService.getUserProfile(userId).toPromise();
    // this.notifications = this.user.notifications;
    console.log("route start", userId);
    this.router.navigate(['/profile/', userId]);
    this.cdr.detectChanges();
  }

  notifyLink(notificationId, type) {
    this.isNotification = false;
    if(type == 1) { //friend request notification
      this.router.navigate(['/contacts']);
    }else if(type == 2) { // news feed notification
      this.router.navigate(['/profile']);
    }

    this.http.post('contacts/setNotification', {notification_id : notificationId})
        .subscribe(resp => {
          this.notifications = resp['notifications'];
        });
  }
}
