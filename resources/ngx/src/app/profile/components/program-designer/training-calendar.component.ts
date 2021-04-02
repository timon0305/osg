import { Component, OnInit, Input } from '@angular/core';
import { ApplicationUser } from 'src/app/core/classes/user';
import { DataService } from '../../../data.service';

import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ProgramDesignerTrainingDayModalComponent } from './training-day-modal/training-day-modal.component';

@Component({
  selector: 'osg-program-designer-training-calendar',
  templateUrl: './training-calendar.component.html'
})
export class ProgramDesignerTrainingCalendarComponent implements OnInit{

  @Input() applicationUser: ApplicationUser;

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

  get cur_week() {
    return this.dataService.cur_week;
  }
  set cur_week(val) {
    this.dataService.cur_week = val;
  }

  get cur_day() {
    return this.dataService.cur_day;
  }
  set cur_day(val) {
    this.dataService.cur_day = val;
  }

  get first_program() {
    return this.dataService.first_program;
  }

  bsModalRef: BsModalRef;
  constructor(private modalService: BsModalService, private dataService: DataService) { }

  ngOnInit(): void {

  }

  showModal(week, day): void{
    this.cur_week = week;
    this.cur_day = day;
    this.bsModalRef = this.modalService.show(
      ProgramDesignerTrainingDayModalComponent,
      {
          class: 'calendar-modal',
      }
  );
  }
}
