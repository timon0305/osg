import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApplicationUser, ApplicationUserRole } from 'src/app/core/classes/user';
import { ApplicationService } from 'src/app/core/services/application.service';
import { DataService } from '../../data.service';


@Component({
  selector: 'osg-profile',
  templateUrl: './main.component.html'
})
export class ProfileComponent implements OnInit{

  user_id: string = '0';
  sub;

  get data() {
    return this.dataService.sharedData;
  }
  set data(val) {
    this.dataService.sharedData = val;
  }

  get weeks() {
    return this.dataService.weeks;
  }
  set weeks(val) {
    this.dataService.weeks = val;
  }

  get plans() {
    return this.dataService.plans;
  }
  set plans(val) {
    this.dataService.plans = val;
  }

  get workouts() {
    return this.dataService.workouts;
  }
  set workouts(val) {
    this.dataService.workouts = val;
  }

  get design_data() {
    return this.dataService.design_data;
  }
  set design_data(val) {
    this.dataService.design_data = val;
  }

  get calendar_list() {
    return this.dataService.calendar_list;
  }
  set calendar_list(val) {
    this.dataService.calendar_list = val;
  }

  applicationUser: any;
  constructor(private readonly applicationService: ApplicationService,
              private dataService: DataService,
              private _Activatedroute:ActivatedRoute){}

  async ngOnInit() {

    console.log("route receive");
    this.sub = this._Activatedroute.paramMap.subscribe(params => {
      this.user_id = params.get('handle');
    });

    if (this.user_id == '0') {
      this.applicationUser = await this.applicationService.authenticatedUser.toPromise();
    } else {
      this.applicationUser = await this.applicationService.getUserProfile(this.user_id).toPromise();
    }

    this.data = [];
    this.weeks = [];
    this.workouts = [];
    this.plans = [];
    this.design_data = [];
    this.calendar_list = null;
  }

  get role(){
    return this.applicationUser !== undefined ? this.applicationUser.profile.role : '';
  }


  isPersonalTrainer(): boolean{
    return this.role === ApplicationUserRole.PersonalTrainer;
  }

  isProgramDesigner(): boolean{
    return this.role === ApplicationUserRole.ProgramDesigner;
  }

  isStrengthAthlete(): boolean{
    return this.role === ApplicationUserRole.StrengthAthlete;
  }

  isFriend():boolean {
    if(this.applicationUser !== undefined) {
      if(this.applicationUser.profile.is_friend > 1)
        return true;
    }
    return false;
  }
}
