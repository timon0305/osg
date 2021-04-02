import { Component, OnInit, Input } from '@angular/core';
import { ApplicationUser } from 'src/app/core/classes/user';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DataService } from '../../../data.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'osg-program-designer-published-programs',
  templateUrl: './published-programs.component.html'
})
export class ProgramDesignerPublishedProgramsComponent implements OnInit{

  publishedPrograms = [];
  showingPrograms = [];
  cur_page = 0;

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

  get first_program() {
    return this.dataService.first_program;
  }
  set first_program(val) {
    this.dataService.first_program = val;
  }

  @Input() applicationUser: ApplicationUser;

  constructor(private spinner: NgxSpinnerService, private http: HttpClient, private dataService: DataService) {}

  ngOnInit(): void {
    this.http.post('program/restapi?info=get-programs', {}, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    })
    .subscribe(resp => {
      console.log('published programs = ', resp);
      this.publishedPrograms = resp['data'];
      for(var i = 0; i < 5; i ++){
        if(this.publishedPrograms[i]){
          this.showingPrograms.push(this.publishedPrograms[i]);
        } else {
          this.showingPrograms.push([]);
        }
      }
    });
  }

  onPrevPage() {
    if(this.cur_page > 0) {
      this.cur_page--;
      this.showingPrograms = [];
      for(var i=0;i<5;i++){
        if(this.publishedPrograms[i+this.cur_page*5]) {
          this.showingPrograms.push(this.publishedPrograms[i+this.cur_page*5]);
        } else {
          this.showingPrograms.push([]);
        }
      }
    }
  }

  onNextPage() {
    if(this.cur_page < Math.floor((this.publishedPrograms.length-1)/5)) {
      this.cur_page++;
      this.showingPrograms = [];
      for(var i=0;i<5;i++){
        if(this.publishedPrograms[i+this.cur_page*5]) {
          this.showingPrograms.push(this.publishedPrograms[i+this.cur_page*5]);
        } else {
          this.showingPrograms.push([]);
        }
      }
    }
  }

  onSelectProgram(ind) {
    this.first_program = this.showingPrograms[ind];
    this.spinner.show();
    this.loadCalendarData(this.first_program['id']);
    document.getElementById("training-program").scrollIntoView();
  }

  loadCalendarData(program_id) {
    this.http.get('/progression/getCalendarData?program_id='+program_id)
      .subscribe(resp => {
        var temp = [];
        resp['weeks'].forEach(item => {
          temp.push(JSON.parse(item.data));
        });
        this.weeks = temp;
        console.log('weeks = ', temp);
        this.getPlan(program_id);
      });
  }

  getPlan(program_id){
    this.http.get('/progression/getPlan?program_id='+program_id)
      .subscribe(resp => {
        this.plans = resp['data'];
        console.log('plans = ', resp['data']);
        this.getWorkouts(program_id);
      });
  }

  getWorkouts(program_id) {
    this.http.get('/progression/getWorkouts?program_id='+program_id)
      .subscribe(resp => {
        this.workouts = resp['data'];
        console.log('workouts = ', resp['data']);
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
  }
}
