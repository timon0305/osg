import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'osg-workout-detail-progress',
  templateUrl: './workout-detail-progress.component.html'
})
export class WorkoutDetailProgressComponent implements OnInit{
  @Output() valueChange = new EventEmitter();
  @Input() reps: number;
  @Input() rtf: number;

  ngOnInit(): void {}

  IncraseRTF() {
    if (this.rtf < 5) this.rtf ++;
    let obj = {
      reps: this.reps,
      rtf: this.rtf
    };
    this.valueChange.emit(obj);
  }

  DecraseRTF() {
    if (this.rtf > 0) { this.rtf --; }
    let obj = {
      reps: this.reps,
      rtf: this.rtf
    };
    this.valueChange.emit(obj);
  }

  IncraseREPS() {
    this.reps ++;
    let obj = {
      reps: this.reps,
      rtf: this.rtf
    };
    this.valueChange.emit(obj);
  }

  DecraseREPS() {
    if (this.reps > 0) { this.reps --; }
    let obj = {
      reps: this.reps,
      rtf: this.rtf
    };
    this.valueChange.emit(obj);
  }
}
