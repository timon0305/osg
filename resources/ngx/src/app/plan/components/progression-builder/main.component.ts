import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { DataService } from '../../../data.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {ActivatedRoute} from '@angular/router';
import { SweetAlert } from 'sweetalert/typings/core';
import * as _swal from 'sweetalert';

@Component({
  selector: 'osg-progression-builder',
  templateUrl: './main.component.html'
})
export class ProgressionBuilderComponent implements OnInit{

  @Output() cancel: EventEmitter<any> = new EventEmitter();

  // weeks = [];
  // plans = [];
  // workouts = [];
  // public data = [];
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

  get week_types() {
    return this.dataService.week_types;
  }
  set week_types(val) {
    this.dataService.week_types = val;
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

  swal: SweetAlert = _swal as any;

  constructor(private spinner: NgxSpinnerService, private http: HttpClient, private dataService: DataService, private route:ActivatedRoute) {}

  ngOnInit(): void {
    var interval = setInterval(()=>{
      // if(this.dataService.cur_program_id != -1) {
      if(this.weeks.length && this.plans.length && this.workouts.length){
        // this.loadCalendarData(this.dataService.cur_program_id);
        // this.calculateData();
        this.loadProgressionData(this.dataService.cur_program_id);
        clearInterval(interval);
      }
    }, 100);
  }

  loadProgressionData(program_id) {
    this.http.post('/progression/duplicateFromCalendarBuilder?program_id='+program_id, {})
      .subscribe(resp => {
        var temp = [];
        var temp1 = [];
        resp['weeks'].forEach(item => {
          temp.push(JSON.parse(item.data));
          temp1.push(item.week_type)
        });
        this.weeks = temp;
        this.week_types = temp1;

        this.plans = resp['plans'];
        // console.log('plans = ', resp['data']);
        this.plans.forEach((plan, index) => {
          plan.plan_id = index+1;
        });

        this.workouts = resp['workouts'];
        // console.log('workouts = ', resp['data']);
        this.workouts.forEach(workout => {
          this.plans.forEach(plan => {
            if(plan.id == workout.plan) {
              workout.plan_id = plan.plan_id;
            }
          })
        });

        this.calculateData();
      });
  }

  loadCalendarData(program_id) {
    this.http.get('/progression/getCalendarData?program_id='+program_id)
      .subscribe(resp => {
        var temp = [];
        var temp1 = [];
        resp['weeks'].forEach(item => {
          temp.push(JSON.parse(item.data));
          temp1.push(item.week_type)
        });
        this.weeks = temp;
        this.week_types = temp1;
        // console.log('weeks = ', temp);
        this.getPlan(program_id);
      });
  }

  getPlan(program_id){
    this.http.get('/progression/getPlan?program_id='+program_id)
      .subscribe(resp => {
        this.plans = resp['data'];
        // console.log('plans = ', resp['data']);
        this.plans.forEach((plan, index) => {
          plan.plan_id = index+1;
        });
        this.getWorkouts(program_id);
      });
  }

  getWorkouts(program_id) {
    this.http.get('/progression/getWorkouts?program_id='+program_id)
      .subscribe(resp => {
        this.workouts = resp['data'];
        // console.log('workouts = ', resp['data']);
        this.workouts.forEach(workout => {
          this.plans.forEach(plan => {
            if(plan.id == workout.plan) {
              workout.plan_id = plan.plan_id;
            }
          })
        })
        this.calculateData();
      });
  }



  calculateData() {
    var dataArray = [];

    this.weeks.forEach(week => {
      var temp = [];
      week.forEach(day => {
        var tmpData = new Object();
        tmpData['day'] = day;
        tmpData['body_parts'] = [];
        this.workouts.forEach(workout => {
          if(workout.plan == day) {
            var flg = false;
            tmpData['body_parts'].forEach(body_part => {
              if(body_part.name == workout.bodypart_name) {
                flg = true;
                var ex_flg = false;
                body_part.exercises.forEach(exercise => {
                  if(exercise.name == workout.name) {
                    ex_flg = true;
                    exercise.data.push(workout);
                    exercise.row++;
                    body_part.row++;
                    body_part.totalReps += parseInt(workout.reps);
                    body_part.totalRm += parseFloat(workout.rm);
                    body_part.totalExercise++;
                    body_part.totalLoad += workout.reps * workout.rm;
                  }
                });
                if(!ex_flg){
                  body_part.exercises.push({
                    name: workout.name,
                    data: [workout],
                    row: 1
                  });
                  body_part.row++;
                  body_part.totalReps += parseInt(workout.reps);
                  body_part.totalRm += parseFloat(workout.rm);
                  body_part.totalExercise += 1;
                  body_part.totalLoad += workout.reps * workout.rm;
                }
                // body_part.exercises.push(workout);
              }
            });
            if(!flg) {
              tmpData['body_parts'].push({
                name: workout.bodypart_name,
                exercises: [{
                  name: workout.name,
                  data: [workout],
                  row: 1,
                }],
                row: 1,
                totalReps: parseInt(workout.reps),
                totalRm: parseFloat(workout.rm),
                totalExercise: 1,
                totalLoad: workout.reps * workout.rm
              });
            }
            if(tmpData['body_parts'].length == 0) {
              tmpData['body_parts'].push({
                name: workout.bodypart_name,
                exercises: [{
                  name: workout.name,
                  data: [workout],
                  row: 1
                }],
                row: 1,
                totalReps: parseInt(workout.reps),
                totalRm: parseFloat(workout.rm),
                totalExercise: 1,
                totalLoad: workout.reps * workout.rm
              });
            }
          }
        });
        temp.push(tmpData);
      });
      dataArray.push(temp);
    })
    this.spinner.hide();

    this.data = dataArray;

    this.dataService.calculateStatistics();
    this.dataService.calculateOverloadGraphData();
    this.isLoading = false;
  }

  onPublish() {
    if (this.dataService.program.name == '' || this.dataService.program.name == null) {
      this.swal({
          title: 'Program is not completed!',
          text: 'Program name is empty.',
          icon: 'error',
          buttons: {
              confirm : {text: 'OK', className: 'btn-yellow-gradient'}
          }
        });
      return;
    } else if (this.dataService.program.category == '' || this.dataService.program.category == null) {
        this.swal({
            title: 'Program is not completed!',
            text: 'Program category is empty',
            icon: 'error',
            buttons: {
                confirm : { text: 'OK', className: 'btn-yellow-gradient' }
            }
          });
        return;
    } else if (this.dataService.program.split == '' || this.dataService.program.split == null) {
        this.swal({
            title: 'Program is not completed!',
            text: 'Program split is empty',
            icon: 'error',
            buttons: {
                confirm : { text: 'OK', className: 'btn-yellow-gradient' }
            }
          });
        return;
    }

    this.spinner.show();

    this.http.post('program/restapi?info=save-program-progression', {
      program: this.dataService.program,
      program_id: this.dataService.cur_program_id,
      calendar: this.weeks,
      week_types: this.week_types,
      workouts: this.workouts
    }, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    }).subscribe(resp => {
      console.log('save result = ', resp);
      this.http.post('program/restapi?info=publish-program', {program_id: this.dataService.cur_program_id}, {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
        })
      }).subscribe(resp => {
        console.log('publish result = ', resp);
        this.spinner.hide();
        this.swal({
          title: 'Publish completed!',
          text: 'Program was published successfully.',
          icon: 'success',
          buttons: {
              confirm : { text: 'OK', className: 'btn-yellow-gradient' }
          }
        });
        document.location.href="/#/profile";
      });
    });


  }

  onSave() {
    console.log('program = ', this.dataService.program);

    if (this.dataService.program.name == '' || this.dataService.program.name == null) {
        this.swal({
            title: 'Program is not completed!',
            text: 'Program name is empty.',
            icon: 'error',
            buttons: {
                confirm : {text: 'OK', className: 'btn-yellow-gradient'}
            }
          });
        return;
    } else if (this.dataService.program.category == '' || this.dataService.program.category == null) {
        this.swal({
            title: 'Program is not completed!',
            text: 'Program category is empty',
            icon: 'error',
            buttons: {
                confirm : { text: 'OK', className: 'btn-yellow-gradient' }
            }
          });
        return;
    } else if (this.dataService.program.split == '' || this.dataService.program.split == null) {
        this.swal({
            title: 'Program is not completed!',
            text: 'Program split is empty',
            icon: 'error',
            buttons: {
                confirm : { text: 'OK', className: 'btn-yellow-gradient' }
            }
          });
        return;
    }


    this.spinner.show();

    this.http.post('program/restapi?info=save-program-progression', {
      program: this.dataService.program,
      program_id: this.dataService.cur_program_id,
      calendar: this.weeks,
      week_types: this.week_types,
      workouts: this.workouts
    }, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    }).subscribe(resp => {
      console.log('save result = ', resp);
      this.spinner.hide();
      this.swal({
        title: 'Save completed!',
        text: 'Program was saved successfully.',
        icon: 'success',
        buttons: {
            confirm : { text: 'OK', className: 'btn-yellow-gradient' }
        }
      });
      document.location.href="/#/profile";
    });
  }

  back(){
    this.cancel.emit(null);
  }

}
