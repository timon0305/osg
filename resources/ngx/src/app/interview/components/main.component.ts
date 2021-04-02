import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';

export class BasicInfo {
  waist: string;
  hip: string;
  weight: string;
  ratio: string;
}
export class Date {
  mon: Boolean;
  tue: Boolean;
  wed: Boolean;
  thu: Boolean;
  fri: Boolean;
  sat: Boolean;
  sun: Boolean;
}

@Component({
  selector: 'osg-interview',
  templateUrl: './main.component.html'
})
export class InterviewComponent implements OnInit {
  trainingdays: Array<String> = [];
  basic_info: BasicInfo = { waist: '', hip: '', weight: '', ratio: ''};
  estimated_rms: Array<{key: String, text: String, load: any, reps: Number, result: any}> = [
    {key: 'flat_bench_press', text: 'flat bench press', load: '--- Type ---', reps: 0, result: 0},
    {key: 'incline_barbell_press', text: 'incline barbell press', load: '--- Type ---', reps: 0, result: 0},
    {key: 'flat_bench_flyes', text: 'flat bench flyes', load: '--- Type ---', reps: 0, result: 0},
    {key: 'dumbell_shoulder_press', text: 'dumbell shoulder press', load: '--- Type ---', reps: 0, result: 0},
    {key: 'dumbell_lateral_raise', text: 'dumbell lateral raise', load: '--- Type ---', reps: 0, result: 0},
    {key: 'bent_dumbell_lateral', text: 'bent dumbell lateral', load: '--- Type ---', reps: 0, result: 0},
    {key: 'scrull_crusher', text: 'scrull crusher', load: '--- Type ---', reps: 0, result: 0},
    {key: 'push_down', text: 'push down', load: '--- Type ---', reps: 0, result: 0},
    {key: 'bent_over_barbell', text: 'bent over barbell', load: '--- Type ---', reps: 0, result: 0},
    {key: 'wide_grip', text: 'wide grip', load: '--- Type ---', reps: 0, result: 0},
    {key: 'close_grip', text: 'close grip', load: '--- Type ---', reps: 0, result: 0},
    {key: 'scott_curl', text: 'scott curl', load: '--- Type ---', reps: 0, result: 0},
    {key: 'seated_hammer_curl', text: 'seated hammer curl', load: '--- Type ---', reps: 0, result: 0},
    {key: 'squat', text: 'squat', load: '--- Type ---', reps: 0, result: 0},
    {key: 'lunges', text: 'lunges', load: '--- Type ---', reps: 0, result: 0},
    {key: 'leg_extension', text: 'leg extension', load: '--- Type ---', reps: 0, result: 0},
    {key: 'seated_leg_curls', text: 'seated leg curls', load: '--- Type ---', reps: 0, result: 0},
    {key: 'standing_carf', text: 'standing carf', load: '--- Type ---', reps: 0, result: 0},
    {key: 'cabel_abdominal', text: 'cabel abdominal', load: '--- Type ---', reps: 0, result: 0}
  ];
  activity_selects: Array<{key: String, intensity: String, duration_hour: Number, duration_min: Number, days: Date}> = [
    {key: 'endurance', intensity: '', duration_hour: 0, duration_min: 0,
    days: {mon: false, tue: false, wed: false, thu: false, fri: false, sat: false, sun: false}},
    {key: 'strength', intensity: '', duration_hour: 0, duration_min: 0,
    days: {mon: false, tue: false, wed: false, thu: false, fri: false, sat: false, sun: false}},
    {key: 'balance', intensity: '', duration_hour: 0, duration_min: 0,
    days: {mon: false, tue: false, wed: false, thu: false, fri: false, sat: false, sun: false}},
    {key: 'flexibility', intensity: '', duration_hour: 0, duration_min: 0,
    days: {mon: false, tue: false, wed: false, thu: false, fri: false, sat: false, sun: false}}
  ];
  step_count = 1;

  customOptions: OwlOptions = {
    stagePadding: 0,
    loop: false,
    margin: 0,
    nav: false,
    dots: false,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    autoWidth: true,
    items: 1
  };
  width: string;
  train_type: Number;
  isFocus: string;

  ngOnInit(): void {
    this.width = window.innerWidth.toString();
    this.train_type = 0;
  }

  NextToStep2() {
    this.step_count = 2;
  }

  NextToStep3() {
    this.step_count = 3;
  }

  PrevToStep1() {
    this.step_count = 1;
  }

  PrevToStep2() {
    this.step_count = 2;
  }

  CheckTrainingDay(key, type) {
    this.activity_selects.forEach(sel => {
      if (key === sel.key) {
        sel.days[type] = !sel.days[type];
      }
    });
  }

  onChange(val, key) {
    this.estimated_rms.forEach(sel => {
      if (key === sel.key) {
        sel.result = Math.round(sel.load * (1 + val / 30));
      }
    });
  }

  onIntensityChange(val, key) {
    this.activity_selects.forEach(sel => {
      if (key === sel.key) {
        sel.intensity = val;
      }
    });
  }

  onDurationHourChange(val, key) {
    this.activity_selects.forEach(sel => {
      if (key === sel.key) {
        sel.duration_hour = val;
      }
    });
  }

  onDurationMinChange(val, key) {
    this.activity_selects.forEach(sel => {
      if (key === sel.key) {
        sel.duration_min = val;
      }
    });
  }

  owlCarNext(owlCar) {
    owlCar.next();
  }

  owlCarPrev(owlCar) {
    owlCar.prev();
  }

  onSelectTrainingType(type) {
    this.train_type = type;
  }

  onFocus(type) {
    this.isFocus = type;
  }

  onBlur() {
    this.isFocus = '';
  }
}
