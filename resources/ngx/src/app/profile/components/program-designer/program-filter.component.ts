import { Component, OnInit, Input } from '@angular/core';
import { ApplicationUser } from 'src/app/core/classes/user';
import { DataService } from '../../../data.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'osg-program-designer-program-filter',
  templateUrl: './program-filter.component.html'
})
export class ProgramDesignerProgramFilterComponent implements OnInit{

  @Input() applicationUser: ApplicationUser;

  isLoading = true;
  publishedPrograms: any;
  currentProgram: any;

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

  get reviews() {
    return this.dataService.reviews;
  }
  set reviews(val) {
    this.dataService.reviews = val;
  }

  constructor(private spinner: NgxSpinnerService, private http: HttpClient, private dataService: DataService) {}

  getStartedSections = ["calendar builder guide", "progression model guide", "about auto-regulation", "experience bank guide"];
  current_set: string;

  ngOnInit(): void {
    this.current_set = "profile";
    if(!this.data.length) {
      this.spinner.show();
      this.http.post('program/restapi?info=get-programs', {}, {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
        })
      })
      .subscribe(resp => {
        console.log('published programs = ', resp);
        this.publishedPrograms = resp['data'];
        var program_id = this.publishedPrograms[0] ? this.publishedPrograms[0].id : -1;
        this.first_program = this.publishedPrograms[0] ? this.publishedPrograms[0] : {name: '', category: '', split: '', description: '', is_saved: -1};
        this.currentProgram = this.publishedPrograms[0] ? this.publishedPrograms[0] : {name: '', category: '', split: '', description: '', is_saved: -1};
        this.loadCalendarData(program_id);
        this.loadReviews(program_id);
        this.isLoading = true;
      });
    }
  }

  onSelected(program) {
    this.currentProgram = program;
    // this.loadCalendarData(program.id);
  }

  onShowResult() {
    this.first_program = this.currentProgram;
    this.loadCalendarData(this.first_program['id']);
    this.loadReviews(this.first_program['id']);
  }

  loadReviews(program_id) {
    this.http.post('program/restapi?info=read-reviews', {program_id: program_id}, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    })
    .subscribe(resp => {
      console.log('read reviews = ', resp);
      this.reviews = resp['data'];
    });
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
    this.isLoading = false;
  }

}
