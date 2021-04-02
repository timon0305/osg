import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SimpleModalService } from 'ngx-simple-modal';
import { ModalComponent } from './modal.component';

export class Workout {
  date: string;
  month: string;
  day: number;
  status: string;
  detail: string;
  type: string;
}

@Component({
  selector: 'osg-workout-log',
  templateUrl: './main.component.html'
})
export class WorkoutLogComponent implements OnInit {
  dates: Array<Workout> = new Array();
  today: string;
  current_month: string;
  current_year: Number;

  constructor(
    private router: Router,
    private simpleModalService: SimpleModalService
  ) {}

  ngOnInit(): void {
    this.getCurrentDay();
    this.setDates();
  }

  showWorkout(date: string, status: string) {
    this.simpleModalService.addModal(
      ModalComponent,
      {
        date: date,
        status: status,
        detail: 'Back & Biceps',
        type: 'German Volume Training'
      },
      { closeOnEscape: true, closeOnClickOutside: true }
    );
  }

  start(date: string) {
    this.router.navigate(['/workout-detail', date, 'start']);
  }

  edit(date: string) {
    this.router.navigate(['/workout-detail', date, 'edit']);
  }

  getCurrentDay() {
    const day_of_week = [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday'
    ];
    const month_of_year = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December'
    ];

    const today = new Date();
    this.current_month = month_of_year[today.getMonth()];
    this.current_year = today.getFullYear();

    const dd = String(today.getDate()).padStart(2, '0');
    this.today =
      day_of_week[today.getDay()] + ', ' + this.current_month + ' ' + dd;
  }

  setDates() {
    const day_of_week = [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday'
    ];
    const month_of_year = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December'
    ];

    const date = new Date();
    const dd = String(date.getDate()).padStart(2, '0');
    const mm = month_of_year[date.getMonth()];
    const yy = date.getFullYear();
    const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    const current_month_end = lastDay.toString().split(' ')[2];

    for (let i = 1; i <= Number(current_month_end); i++) {
      if (i > Number(dd)) {
        const cur_month = Number(date.getMonth()) + 1;
        const cur_date = new Date(yy + '-' + cur_month + '-' + i);
        const detail = new Workout();
        detail.date = String(day_of_week[cur_date.getDay()]);
        detail.status = 'upcoming';
        detail.day = i;
        detail.month = mm;
        detail.detail = '';
        detail.type = 'GVT';
        this.dates.push(detail);
      }
    }
  }
}
