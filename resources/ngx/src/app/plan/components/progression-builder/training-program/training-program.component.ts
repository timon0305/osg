import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { ApplicationUser } from 'src/app/core/classes/user';
import { NONE_TYPE } from '@angular/compiler/src/output/output_ast';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NgxSpinnerService } from 'ngx-spinner';
import { DataService } from '../../../../data.service';

@Component({
    selector: 'osg-progression-builder-training-program',
    templateUrl: './training-program.component.html'
})
export class ProgressionBuilderTrainingProgramComponent implements OnInit {
    deltaX: number = 865;
    left: number = 0;
    rate: number = 1;
    min_rate: number = 0.5;
    max_rate: number = 1.5;

    // weeks = [];
    // plans = [];
    // workouts = [];
    // public data = [];
    isLoading = true;
    idx = 1;

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

    get cur_body_part() {
      return this.dataService.cur_body_part;
    }
    set cur_body_part(val) {
      this.dataService.cur_body_part = val;
    }

    constructor(private spinner: NgxSpinnerService, private http: HttpClient, private dataService: DataService) {
    }


    public bgColor = "";
    // public options = [
    //     'Straight Set',
    //     'Warm up set',
    //     'Test (AMRAP) set',
    //     'Pyramid set',
    //     'Super set',
    //     'Giant set',
    //     'Pre-exhaust set',
    //     'Drop set'
    // ];
    public options = [
      '',
      'Straight set',
      'Warm up set',
      'Test (AMRAP) set',
      'Pyramid set',
      'Super set',
      'Giant set',
      'Pre-exhaust set',
      'Drop set'
    ];
    public days = [
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
      'Sunday'
    ];
    public week_type = [
      'Test & training week',
      'Training week',
      'Deload week'
    ];
    rm_data = [
      [100, 95.5, 92.2, 89.2, 86.3, 83.7, 81.1, 78.6, 76.2, 73.9, 70.7, 68],
      [95.5, 92.2, 89.2, 86.3, 83.7, 81.1, 78.6, 76.2, 73.9, 70.7, 68, 65.3],
      [92.2, 89.2, 86.3, 83.7, 81.1, 78.6, 76.2, 73.9, 70.7, 68, 65.3, 62.6],
      [89.2, 86.3, 83.7, 81.1, 78.6, 76.2, 73.9, 70.7, 68, 65.3, 62.6, 59.9],
      [85.3, 83.15, 80.75, 78.35, 76, 73.65, 71.45, 68.35, 65.25, 62.35, 59.9, 57.2],
      [81.73, 80.09, 77.91, 75.66, 73.43, 71.15, 69.05, 65.75, 62.47, 59.5, 57.2, 54.5]
    ];
    @ViewChild('trainingProgramWrapper') wrapper: ElementRef;

    @Input() applicationUser: ApplicationUser;

    ngOnInit(): void {
      var timer = setInterval(() => {
        if(this.data.length && this.weeks.length && this.plans.length && this.workouts.length) {
          clearInterval(timer);
          console.log('training    data = ', this.data);
          console.log('training    weeks = ', this.weeks);
          console.log('training    week_types = ', this.week_types);
          console.log('training    plans = ', this.plans);
          console.log('training    workouts = ', this.workouts);
          this.weeks.forEach((week, index) => {
            this.setWeekType(index, 1);
          })
        }
      }, 50);
    }

    setWeekType(index, type) {
      if(index == 0 || index == this.weeks.length-1) {
        this.week_types[index] = this.week_type[0];
      } else {
        if(this.weeks.length >= 2 && index == this.weeks.length-2) {
          this.week_types[index] = this.week_type[2];
        } else {
          if(type == 0) { type = 1; }
          this.week_types[index] = this.week_type[type];
        }
      }
    }

    setDayIndex(val) {
      this.idx = val;
    }
    incDayIndex() {
      return this.idx++;
    }

    getPlanName(day) {
      var name = '';
      for(var i=0;i<this.plans.length;i++) {
        if(this.plans[i].id == day) {
          name = this.plans[i].body_parts;
          break;
        }
      }
      return name;
    }

    getPlanId(day) {
      var id = -1;
      for(var i=0;i<this.plans.length;i++) {
        if(this.plans[i].id == day) {
          id = this.plans[i].plan_id;
          break;
        }
      }
      return id;
    }

    calculateTotal() {
      this.data.forEach(week => {
        week.forEach(day => {
          day.body_parts.forEach(body_part => {
            body_part.totalReps = 0;
            body_part.totalRm = 0;
            body_part.totalExercise = 0;
            body_part.totalLoad = 0;
            body_part.exercises.forEach(exercise => {
              exercise.data.forEach(data => {
                body_part.totalExercise ++;
                body_part.totalReps += parseInt(data.reps);
                body_part.totalRm += parseFloat(data.rm);
                body_part.totalLoad += data.reps * data.rm;
              });
            });
          });
        });
      });
      this.dataService.calculateStatistics();
    }

    addRecord(event) {
      const weekIndex = event.target.parentElement.parentElement.dataset.weekIndex;
      const dayIndex = event.target.parentElement.parentElement.dataset.dayIndex;
      const bodypartIndex = event.target.parentElement.parentElement.dataset.bodypartIndex;
      const exerciseIndex = event.target.parentElement.parentElement.dataset.exerciseIndex;
      const _exercise = this.data[weekIndex][dayIndex].body_parts[bodypartIndex].exercises[exerciseIndex];
      const _exerciseData = _exercise['data'];
      const _prevOne = _exerciseData[_exerciseData.length - 1];

      const willAddItem = {
        ..._prevOne,
        id: -1
      };

      if (_prevOne['method'] === '8') {
        willAddItem['rest'] = '0:00';
      }

      if (_prevOne['method'] !== '8' || _exerciseData.length < 6) {
        _exerciseData.push(willAddItem);
        this.workouts.push(willAddItem);
      }

      _exercise.row++;
      this.data[weekIndex][dayIndex].body_parts[bodypartIndex].row++;

      this.refreshRMData(weekIndex, dayIndex, bodypartIndex);
      this.calculateTotal();
      this.dataService.calculateStatistics();
      this.dataService.calculateOverloadGraphData();
      // console.log('data = ', this.data);
    }

    removeRecord(event) {
      const weekIndex = event.target.parentElement.parentElement.dataset.weekIndex;
      const dayIndex = event.target.parentElement.parentElement.dataset.dayIndex;
      const bodypartIndex = event.target.parentElement.parentElement.dataset.bodypartIndex;
      const exerciseIndex = event.target.parentElement.parentElement.dataset.exerciseIndex;
      const _exercise = this.data[weekIndex][dayIndex].body_parts[bodypartIndex].exercises;
      const _exerciseData = _exercise[exerciseIndex]['data'];

      _exercise[exerciseIndex].row--;
      this.data[weekIndex][dayIndex]['body_parts'][bodypartIndex].row--;

      var removed = _exerciseData.pop();
      var temp = [];
      this.workouts.forEach(item => {
        if(item.detail_id != removed.detail_id) {
          temp.push(item);
        }
      })
      this.workouts = temp;

      if(_exerciseData.length === 0) {
        _exercise.splice(exerciseIndex, 1);
      }
      if(_exercise.length === 0) {
        this.data[weekIndex][dayIndex]['body_parts'].splice(bodypartIndex, 1);
      }

      this.calculateTotal();
      this.dataService.calculateStatistics();
      this.dataService.calculateOverloadGraphData();

      // const exerciseIndex = event.target.parentElement.parentElement.dataset.exerciseIndex;
      // this.exercise_list[exerciseIndex]['data'].pop();
      // if (this.exercise_list[exerciseIndex]['data'].length === 0) {
      //   this.exercise_list.splice(exerciseIndex, 1);
      // }
      // this.cnt_workout = this.exercise_list.length;
    }

    changeColor(event){
        (event.target.value == 'Test (AMRAP) set') ? event.target.classList.add('onlybg') : event.target.classList.remove('onlybg') ;
    }

    zoomIn(): void {
        if (this.rate < this.max_rate) {
            this.rate += 0.1;
        }
    }

    zoomOut(): void {
        if (this.rate > this.min_rate) {
            this.rate -= 0.1;
        }
    }

    moveLeft(): void {
        if(this.left > -this.deltaX*2){
            this.left -= this.deltaX;
            this.move();
        }
    }

    moveRight(): void {
        if (this.left < -865) {
            this.left += this.deltaX;
            this.move();
        } else if (this.left == -865) {
            this.left = -70;
            this.move();
        }
    }

    move(): void {
        this.wrapper.nativeElement.style = `left: ${this.left}px`;
    }

    IsSameMuscle(one, two) {
      if (one === two) {
        return true;
      }
      const ones = JSON.parse(one);
      const twos = JSON.parse(two);
      for (let i = 0; i < ones.length; i++) {
        for (let j = 0; j < twos.length; j++) {
          if (ones[i]['muscle_id'] === twos[j]['muscle_id']) {
            return true;
          }
        }
      }
      return false;
    }

    changeOption(event, option) {
      // this.loading = true;

      var dataset = event.target.parentElement.parentElement.dataset;
      if(dataset.index == undefined) {
        dataset = event.target.parentElement.parentElement.parentElement.dataset;
      }
      const index = parseInt(dataset.index, 0);
      const exerciseIndex = parseInt(dataset.exerciseIndex, 0);
      const bodypartIndex = parseInt(dataset.bodypartIndex, 0);
      const dayIndex = parseInt(dataset.dayIndex, 0);
      const weekIndex = parseInt(dataset.weekIndex, 0);
      const exercise = this.data[weekIndex][dayIndex]['body_parts'][bodypartIndex]['exercises'][exerciseIndex];
      const currentSet = exercise['data'][index];
      const value = parseInt(event.target.value, 0);
      let newValue = value.toString();

      if (option === 'rtf') {
        if (currentSet['method'] === '3') {
          newValue = '0';
        } else if (!(value >= 0 && value <= 5)) {
          newValue = '';
        }
      } else if (option === 'reps') {
        if (!(value >= 1 && value <= 12)) {
          newValue = '';
        }
      } else if (option === 'method') {
        if (value === 3) {
          currentSet['rtf'] = '0';
          event.target.classList.add('onlybg');
        } else if (value === 8) {
          currentSet['rest'] = '0:00';
          event.target.classList.remove('onlybg');
        } else {
          event.target.classList.remove('onlybg');
        }
      } else if (option === 'rest') {
        if (newValue !== '' && newValue !== null) {
          const values = newValue.split(':');
          if (values.length > 1) {
            newValue = (parseInt(values[0], 0) % 100) + ':' + (parseInt(values[1], 0) % 100);
          } else if (values.length > 0) {
            newValue = (parseInt(values[0], 0) % 100) + ':00';
          } else {
            newValue = '0:00';
          }
        }
      } else if (option === 'tempo') {
        newValue = event.target.value;
      }

      currentSet[option] = newValue;

      if (currentSet['rtf'] !== '' && currentSet['reps'] !== '') {
        currentSet['rm'] = this.rm_data[currentSet['rtf']][currentSet['reps'] - 1].toFixed(2);
      } else {
        currentSet['rm'] = '';
      }

      this.refreshRMData(weekIndex, dayIndex, bodypartIndex);
      this.calculateTotal();
    }

    refreshRMData(weekIndex, dayIndex, bodypartIndex) {
      const self = this;
      const exercise_list = this.data[weekIndex][dayIndex]['body_parts'][bodypartIndex]['exercises']
      exercise_list.forEach(function (exercise, exerciseIndex) {
        exercise['data'].forEach(function (data, index) {
          self.setRMData(index, exerciseIndex, weekIndex, dayIndex, bodypartIndex);
        });
      });
    }

    setRMDataForSet(current, previous) {
      let reduce_percent = 0;
      const sec = this.getSecFromPeriod(previous['rest']);

      if (sec >= 0 && sec <= 29) {
        reduce_percent = 6;
      } else if (sec >= 30 && sec <= 59) {
        reduce_percent = 5;
      } else if (sec >= 60 && sec <= 89) {
        reduce_percent = 4;
      } else if (sec >= 90 && sec <= 119) {
        reduce_percent = 3;
      } else if (sec >= 120 && sec <= 149) {
        reduce_percent = 2;
      } else if (sec >= 150 && sec <= 179) {
        reduce_percent = 1;
      } else if (sec >= 180) {
        reduce_percent = 0;
      }

      const rmValue = this.rm_data[current['rtf']][current['reps'] - 1];
      current['rm'] = (rmValue - reduce_percent).toFixed(2);
    }

    setRMData(index, exerciseIndex, weekIndex, dayIndex, bodypartIndex) {
      const exercise_list = this.data[weekIndex][dayIndex]['body_parts'][bodypartIndex]['exercises'];
      const currentExercise = exercise_list[exerciseIndex];
      const currentSet = currentExercise['data'][index];

      if (currentSet['rtf'] === '' ||
        currentSet['rtf'] === null ||
        currentSet['reps'] === '' ||
        currentSet['reps'] === null) {
        return;
      }

      if (exerciseIndex > 0 && index === 0) {
        const previousExercise = exercise_list[exerciseIndex - 1];
        if (this.IsSameMuscle(currentExercise['target_muscles'], previousExercise['target_muscles'])) {
          this.setRMDataForSet(currentSet, previousExercise['data'][previousExercise['data'].length - 1]);
        }
      } else if (index > 0) {
        this.setRMDataForSet(currentSet, currentExercise['data'][index - 1]);
      }
    }

    getSecFromPeriod(period) {
      if (period === '' || period === null) {
        return -1;
      }
      period = period.split(':');
      if (period.length > 1) {
        return parseInt(period[0], 0) * 60 + parseInt(period[1], 0);
      } else if (period.length > 0) {
        return parseInt(period[0], 0) * 60;
      }

      return -1;
    }


}
