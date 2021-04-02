import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ApplicationUser } from 'src/app/core/classes/user';
import { SimpleModalService } from 'ngx-simple-modal';
import { StrengthAthleteModalComponent } from './modal.component';

export class Workout {
  date: string;
  month: string;
  day: number;
  status: string;
  detail: string;
  type: string;
}
@Component({
  selector: 'osg-strength-athlete-training-calendar',
  templateUrl: './training-calendar.component.html'
})
export class StrengthAthleteTrainingCalendarComponent implements OnInit{
  
  @Input() applicationUser: ApplicationUser;

  dates: Array<Workout> = new Array();
  today: string;
  current_month: string;
  current_year: Number;

  constructor(private simpleModalService: SimpleModalService, private router: Router) {}

  ngOnInit(): void {
    this.getCurrentDay();
    this.setDates();
  }

  showWorkout(date: string, status: string) {
    this.simpleModalService.addModal(StrengthAthleteModalComponent, {date: date, status: status, detail: "Back & Biceps", type:"German Volume Training"}, {closeOnEscape: true, closeOnClickOutside: true});
  }

  start(date: string) {
    this.router.navigate(['/workout-detail', date, 'upcoming']); 
  }

  edit(date: string) {
    this.router.navigate(['/workout-detail', date, 'completed']);
  }

  getCurrentDay() {
    var day_of_week = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    var month_of_year = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    var today = new Date();
    this.current_month = month_of_year[today.getMonth()];
    this.current_year = today.getFullYear();
    
    var dd = String(today.getDate()).padStart(2, '0');
    this.today = day_of_week[today.getDay()] + ", " + this.current_month + " " + dd;
  }

  setDates() {
    var day_of_week = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    var month_of_year = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    var date = new Date();
    var dd = String(date.getDate()).padStart(2, '0');
    var mm = month_of_year[date.getMonth()];
    var yy = date.getFullYear();
    var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    var current_month_end = lastDay.toString().split(" ")[2];
    
    for(var i = 1; i <= Number(current_month_end); i ++) {
      if (i > Number(dd)) {
        var cur_month = Number(date.getMonth())+1;
        var cur_date = new Date(yy+"-"+cur_month+"-"+i);
        var detail= new Workout;
        detail.date = String(day_of_week[cur_date.getDay()])
        detail.status = "upcoming";
        detail.day = i;
        detail.month = mm;
        detail.detail = "";
        detail.type="GVT";
        this.dates.push(detail);
      }
    }
  }
}
