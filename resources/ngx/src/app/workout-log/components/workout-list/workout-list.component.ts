import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'osg-workout-list',
  templateUrl: './workout-list.component.html'
})
export class WorkoutListComponent implements OnInit{
  
  @Input() 
  date1: string = 'Monday, May 6';
  date2: string = 'Wednsday, May 8';
  date3: string = 'Friday, May 10';
  date4: string = 'Monday, May 13';
  date5: string = 'Wednsday, May 15';
  date6: string = 'Wednsday, May 17';

  constructor( private router: Router ) {}

  ngOnInit(): void {
  }

  start(date: string, status: string) {
    if (status == 'completed') {
      console.log(status);
    } else if (status == 'upcoming') {
      console.log(status);
    } else {
      this.router.navigate(['/workout-detail', date, status]); 
    }
  }

  edit(date: string, status: string) {
    if (status != 'upcoming') {
      this.router.navigate(['/workout-detail', date, status]);
    } else {
      console.log(status);
    }
  }
}
