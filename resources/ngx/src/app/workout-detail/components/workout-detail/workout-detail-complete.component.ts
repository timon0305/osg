import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'osg-workout-detail-complete',
  templateUrl: './workout-detail-complete.component.html'
})
export class WorkoutDetailCompleteComponent implements OnInit{
  
  @Input() date: string;
  chest: boolean = true;
  shoulders: boolean = false;
  triceps: boolean = false;
  active:  boolean = true;

  constructor(private router: Router) {}
  
  ngOnInit(): void {
    
  }

  onChangeChest(val) {
    this.chest = val;
  }

  onChangeShoulders(val) {
    this.shoulders = val;
  }

  onChangeTriceps(val) {
    this.triceps = val;
  }

  InjureSelect() {
    this.active = true;
  }

  InjureDeselect() {
    this.active = false;
    this.chest = this.shoulders = this.triceps = false;
  }

  FinishWorkout() {
    this.router.navigate(['/workout-log']);
  }
}
