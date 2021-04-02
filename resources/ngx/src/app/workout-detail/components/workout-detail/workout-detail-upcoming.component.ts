import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'osg-workout-detail-upcoming',
  templateUrl: './workout-detail-upcoming.component.html'
})

export class WorkoutDetailUpcomingComponent implements OnInit{   

  @Output() valueChange = new EventEmitter();
  @Input() status: string;
  time: string;
  reps: string;
  rtf: string;
  load: string;
  count: number = 0;
  constructor() {}

  ngOnInit(): void {    
    this.time = "02:00";
    this.reps = this.rtf = this.load = '-';
  }
  
  edit() {
    this.count ++;
    if (this.count == 2) {
      this.status = "Upcoming";
      this.count = 0;
    } else {
      this.status = "In Progress";
    }
  }

  SkipSet() {
    this.status = "Upcoming";
  }

  FinishSet() {
    this.time = "00:00";
    this.reps = '9';
    this.rtf = '1';
    this.load = '102,5';
    this.status = "Complete";
    this.valueChange.emit(this.status);
  }
}
