import { Component, OnInit } from '@angular/core';

import { DataService } from '../../data.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'osg-plan-builder',
  templateUrl: './main.component.html'
})
export class PlanBuilderComponent implements OnInit {

  step: PlanBuilderStep;

  isLoading = true;

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

  // tslint:disable-next-line:max-line-length
  // getStartedSections: string[] = ["the workout & calendar builder", "progression builder", "experience bank & reviews", "auto-regulation"];

  constructor(private spinner: NgxSpinnerService, private http: HttpClient, private dataService: DataService, private route:ActivatedRoute) {}

  ngOnInit(): void {
    this.step = PlanBuilderStep.CalendarBuilder;

    // if(!this.data.length) {
      // this.spinner.show();

      var url = window.location.href;
      var ind = url.indexOf('program_id');
      console.log('index = ', ind);
      var program_id;
      if(ind > 0) {
        program_id = url.substring(url.indexOf('program_id=')+11);
      } else {
        program_id = -1;
      }
      console.log('program_id = ', program_id);
      this.dataService.cur_program_id = -1;

      if(program_id == -1) {
        // this.http.post('program/restapi?info=create-program', {}, {
        //   headers: new HttpHeaders({
        //     'Content-Type': 'application/json',
        //   })
        // }).subscribe(resp => {
        //   console.log('create program = ', resp['program_id']);
          this.dataService.cur_program_id = -1;//parseInt(resp['program_id']);
          this.isLoading = true;
        // });
      } else {
        this.dataService.cur_program_id = parseInt(program_id);
        console.log('this.program = ', this.dataService.program);
        if(this.dataService.program['is_saved'] == 2) {
          this.next();
        }
        this.isLoading = true;
      }
    // }
  }

  get getStartedSections(): string[] {
    return this.isBuildingCalendar
      ? ['the workout & calendar builder', 'progression builder', 'experience bank & reviews', 'auto-regulation']
      : ['strength training principles', 'program design variables', 'progression models and strategies', 'save & publish programs'];
  }

  get isBuildingCalendar(): boolean {
    return this.step === PlanBuilderStep.CalendarBuilder;
  }

  get isBuildingProgress(): boolean {
    return this.step === PlanBuilderStep.ProgressionBuilder;
  }

  next(){
    window.scroll(0,0);
    this.step = PlanBuilderStep.ProgressionBuilder;
  }

  previous(){
    window.scroll(0,0);
    this.step = PlanBuilderStep.CalendarBuilder;
  }




}


enum PlanBuilderStep {
  CalendarBuilder,
  ProgressionBuilder
}
