import { Component, OnInit, Input } from '@angular/core';
import { ApplicationUser } from 'src/app/core/classes/user';

@Component({
  selector: 'osg-strength-athlete-trophy-wall',
  templateUrl: './trophy-wall.component.html'
})
export class StrengthAthleteTrophyWallComponent implements OnInit{
  
  @Input() applicationUser: ApplicationUser;
  trophies: any[] = [
    {
      title: 'CHEST', 
      css: 'yellow',
      check_lists: ['Bench Press', 'Incline Bench Press', 'Decline Bench Press', 'Flat Dumbell Press', 'Barbell Bench Press', 'Incline Cable Press', 'Dips for Chest', 'Bench Press', 'Incline Bench Press', 'Decline Bench Press', 'Flat Dumbell Press', 'Barbell Bench Press', 'Incline Cable Press', 'Dips for Chest']
    },
    {
      title: 'BACK',
      css: 'green',
      check_lists: ['Wide grip pulldown', 'Close grip pulldown', 'Supinated pull down', 'Pullups, Chins', 'Bent-over barbell rows', 'Bent-over dumbbell  rows', 'Seated machine rows', 'Seated one-arm machine rows']
    },
    {
      title: 'QUADS', 
      css: 'blue',
      check_lists: ['Barbell back squat', 'Barbell front squat', 'Smith-machine back squat', 'Smith-machine front squat', 'Barbell lunges', 'Dumbbell lunges', 'Smith-machine lunges', 'Machine legpress', 'Legextension']
    }
  ];
  
  ngOnInit(): void {
    
  }

}
