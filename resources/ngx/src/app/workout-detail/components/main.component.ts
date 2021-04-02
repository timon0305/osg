import { Component, OnInit, Input, Output, Directive } from '@angular/core';
import { ActivatedRoute  } from '@angular/router';
import { Router } from '@angular/router';
import { NgxSiemaOptions, NgxSiemaService } from 'ngx-siema';

export class CarouselData {
  id?: string;
  text: string;
  exercise: string;
  method: string;
  rest_period: string;
  tempo: String;
  target_reps: String;
  target_rtf: String;
  target_load: String;
  autoreg: String;
  performed_reps: String;
  performed_rtf: String;
}

@Component({
  selector: 'osg-workout-detail',
  templateUrl: './main.component.html'
})
export class WorkoutDetailComponent implements OnInit {
  // status
  year: number;
  date: string;
  day: string;
  status: string;
  type: string;
  current_set: number;
  // variables for performed value
  time: string;
  reps: number;
  rtf: number;
  _reps = 0;
  _rtf = 0;
  // sets slide options
  options: NgxSiemaOptions = {
    selector: '.siema',
    duration: 10,
    easing: 'ease-out',
    perPage: 1,
    startIndex: 0,
    draggable: false,
    threshold: 20,
    loop: false,
    onInit: () => {
      // runs immediately after first initialization
    },
    onChange: () => {
      // runs after slide change
    },
  };
  // sets data
  carouselData: CarouselData[] = [
    { id: '1', text: 'set 1', exercise: 'Bench Press', method: 'Straight', rest_period: '02:00', tempo: '3-0-2-1', target_reps: '10', target_rtf: '1', target_load: '80', autoreg: '85', performed_reps: '11', performed_rtf: '0'},
    { id: '2', text: 'set 2', exercise: 'Bench Press', method: 'Straight', rest_period: '02:00', tempo: '3-0-2-1', target_reps: '10', target_rtf: '1', target_load: '75', autoreg: '0', performed_reps: '0', performed_rtf: '0'},
    { id: '3', text: 'set 3', exercise: 'Flies', method: 'Straight', rest_period: '02:00', tempo: '3-0-2-1', target_reps: '10', target_rtf: '1', target_load: '25', autoreg: '0', performed_reps: '0', performed_rtf: '0'},
    { id: '4', text: 'set 4', exercise: 'Flies', method: 'Straight', rest_period: '02:00', tempo: '3-0-2-1', target_reps: '10', target_rtf: '1', target_load: '25', autoreg: '0', performed_reps: '0', performed_rtf: '0'},
    { id: '5', text: 'set 5', exercise: 'Flies', method: 'Straight', rest_period: '02:00', tempo: '3-0-2-1', target_reps: '10', target_rtf: '1', target_load: '25', autoreg: '0', performed_reps: '0', performed_rtf: '0'},
    { id: '6', text: 'set 6', exercise: 'Flies', method: 'Straight', rest_period: '02:00', tempo: '3-0-2-1', target_reps: '10', target_rtf: '1', target_load: '25', autoreg: '0', performed_reps: '0', performed_rtf: '0'},
    { id: '7', text: 'set 7', exercise: 'Flies', method: 'Straight', rest_period: '02:00', tempo: '3-0-2-1', target_reps: '10', target_rtf: '1', target_load: '25', autoreg: '0', performed_reps: '0', performed_rtf: '0'},
    { id: '8', text: 'set 8', exercise: 'Flies', method: 'Straight', rest_period: '02:00', tempo: '3-0-2-1', target_reps: '10', target_rtf: '1', target_load: '25', autoreg: '0', performed_reps: '0', performed_rtf: '0'},
    { id: '9', text: 'set 9', exercise: 'Flies', method: 'Straight', rest_period: '02:00', tempo: '3-0-2-1', target_reps: '10', target_rtf: '1', target_load: '25', autoreg: '0', performed_reps: '0', performed_rtf: '0'},
    { id: '10', text: 'set 10', exercise: 'Flies', method: 'Straight', rest_period: '02:00', tempo: '3-0-2-1', target_reps: '10', target_rtf: '1', target_load: '25', autoreg: '0', performed_reps: '0', performed_rtf: '0'},
    { id: '11', text: 'set 11', exercise: 'Flies', method: 'Straight', rest_period: '02:00', tempo: '3-0-2-1', target_reps: '10', target_rtf: '1', target_load: '25', autoreg: '0', performed_reps: '0', performed_rtf: '0'},
    { id: '12', text: 'set 12', exercise: 'Flies', method: 'Straight', rest_period: '02:00', tempo: '3-0-2-1', target_reps: '10', target_rtf: '1', target_load: '25', autoreg: '0', performed_reps: '0', performed_rtf: '0'},
    { id: '13', text: 'set 13', exercise: 'Flies', method: 'Straight', rest_period: '02:00', tempo: '3-0-2-1', target_reps: '10', target_rtf: '1', target_load: '25', autoreg: '0', performed_reps: '0', performed_rtf: '0'},
    { id: '14', text: 'set 14', exercise: 'Flies', method: 'Straight', rest_period: '02:00', tempo: '3-0-2-1', target_reps: '10', target_rtf: '1', target_load: '25', autoreg: '0', performed_reps: '0', performed_rtf: '0'},
    { id: '15', text: 'set 15', exercise: 'Flies', method: 'Straight', rest_period: '02:00', tempo: '3-0-2-1', target_reps: '10', target_rtf: '1', target_load: '25', autoreg: '0', performed_reps: '0', performed_rtf: '0'},
    { id: '16', text: 'set 16', exercise: 'Flies', method: 'Straight', rest_period: '02:00', tempo: '3-0-2-1', target_reps: '10', target_rtf: '1', target_load: '25', autoreg: '0', performed_reps: '0', performed_rtf: '0'},
    { id: '17', text: 'set 17', exercise: 'Flies', method: 'Straight', rest_period: '02:00', tempo: '3-0-2-1', target_reps: '10', target_rtf: '1', target_load: '25', autoreg: '0', performed_reps: '0', performed_rtf: '0'},
    { id: '18', text: 'set 18', exercise: 'Flies', method: 'Straight', rest_period: '02:00', tempo: '3-0-2-1', target_reps: '10', target_rtf: '1', target_load: '25', autoreg: '0', performed_reps: '0', performed_rtf: '0'},
    { id: '19', text: 'set 19', exercise: 'Flies', method: 'Straight', rest_period: '02:00', tempo: '3-0-2-1', target_reps: '10', target_rtf: '1', target_load: '25', autoreg: '0', performed_reps: '0', performed_rtf: '0'},
    { id: '20', text: 'set 20', exercise: 'Flies', method: 'Straight', rest_period: '02:00', tempo: '3-0-2-1', target_reps: '10', target_rtf: '1', target_load: '25', autoreg: '0', performed_reps: '0', performed_rtf: '0'},
    { id: '21', text: 'set 21', exercise: 'Flies', method: 'Straight', rest_period: '02:00', tempo: '3-0-2-1', target_reps: '10', target_rtf: '1', target_load: '25', autoreg: '0', performed_reps: '0', performed_rtf: '0'},
    { id: '22', text: 'set 22', exercise: 'Flies', method: 'Straight', rest_period: '02:00', tempo: '3-0-2-1', target_reps: '10', target_rtf: '1', target_load: '25', autoreg: '0', performed_reps: '0', performed_rtf: '0'},
    { id: '23', text: 'set 23', exercise: 'Flies', method: 'Straight', rest_period: '02:00', tempo: '3-0-2-1', target_reps: '10', target_rtf: '1', target_load: '25', autoreg: '0', performed_reps: '0', performed_rtf: '0'},
    { id: '24', text: 'set 24', exercise: 'Flies', method: 'Straight', rest_period: '02:00', tempo: '3-0-2-1', target_reps: '10', target_rtf: '1', target_load: '25', autoreg: '0', performed_reps: '0', performed_rtf: '0'},
    { id: '25', text: 'set 25', exercise: 'Flies', method: 'Straight', rest_period: '02:00', tempo: '3-0-2-1', target_reps: '10', target_rtf: '1', target_load: '25', autoreg: '0', performed_reps: '0', performed_rtf: '0'},
    { id: '26', text: 'set 26', exercise: 'Flies', method: 'Straight', rest_period: '02:00', tempo: '3-0-2-1', target_reps: '10', target_rtf: '1', target_load: '25', autoreg: '0', performed_reps: '0', performed_rtf: '0'},
    { id: '27', text: 'set 27', exercise: 'Flies', method: 'Straight', rest_period: '02:00', tempo: '3-0-2-1', target_reps: '10', target_rtf: '1', target_load: '25', autoreg: '0', performed_reps: '0', performed_rtf: '0'},
    { id: '28', text: 'set 28', exercise: 'Flies', method: 'Straight', rest_period: '02:00', tempo: '3-0-2-1', target_reps: '10', target_rtf: '1', target_load: '25', autoreg: '0', performed_reps: '0', performed_rtf: '0'},
    { id: '29', text: 'set 29', exercise: 'Flies', method: 'Straight', rest_period: '02:00', tempo: '3-0-2-1', target_reps: '10', target_rtf: '1', target_load: '25', autoreg: '0', performed_reps: '0', performed_rtf: '0'},
    { id: '30', text: 'set 30', exercise: 'Flies', method: 'Straight', rest_period: '02:00', tempo: '3-0-2-1', target_reps: '10', target_rtf: '1', target_load: '25', autoreg: '0', performed_reps: '0', performed_rtf: '0'}
  ];

  constructor(private activeRoute: ActivatedRoute, private router: Router, private ngxSiemaService: NgxSiemaService) { 
    this.activeRoute.paramMap.subscribe(params => {
      const temp = params.get('date');
      this.date = temp.split(' ')[0];
      this.day = temp.split(' ')[1] + ' ' + temp.split(' ')[2];
      this.status = params.get('status');
    });
    this.type = 'chest';
    this.current_set = 1;
    this.year = (new Date()).getFullYear();
  }

  ngOnInit(): void {
    this.time = '02:00';
    this.carouselData.forEach((item) => {
      // tslint:disable-next-line: radix
      if (parseInt(item.id) == this.current_set) {
        this.reps = this._reps = Number(item.performed_reps);
        this.rtf = this._rtf = Number(item.performed_rtf);
      }
    });
  }

  ngAfterViewInit() {
    window.scrollTo(0, 0);
  }

  // get emit performed reps and rtf
  valueChange(event) {
    this.reps = event.reps;
    this.rtf = event.rtf;
    this.carouselData.forEach((item) => {
      // tslint:disable-next-line: radix
      if (parseInt(item.id) === this.current_set) {
        item.performed_reps = String(this.reps);
        item.performed_rtf = String(this.rtf);
      }
    });
  }

  slidePrev() {
    this.ngxSiemaService.prev(1)
      .subscribe((data: any) => console.log(data));
  }

  slideNext() {
    this.ngxSiemaService.next(1)
    .subscribe((data: any) => console.log(data));
  }

  slideRefresh() {
    this.ngxSiemaService.goTo(0)
      .subscribe((data: any) => console.log(data));
  }

  back() {
    this.router.navigate(['/workout-log']);
  }

  reSet() {
    this.current_set = 1;
    this.ngxSiemaService.goTo(0)
      .subscribe((data: any) => console.log(data));
  }

  finishSet() {
    this.time = '00:00';
    let able_finish = false;
    this.carouselData.forEach((item) => {
      if (!able_finish) {
        // tslint:disable-next-line: radix
        if (parseInt(item.id) === this.current_set) {
          if ((Number(item.performed_reps) >= Number(item.target_reps)) && (Number(item.performed_rtf) >= Number(item.target_rtf))) {
            able_finish = true;
          }
        }
      } else {
        // tslint:disable-next-line: radix
        if (parseInt(item.id) === this.current_set + 1) {
          this.reps = this._reps = Number(item.performed_reps);
          this.rtf = this._rtf = Number(item.performed_rtf);
        }
      }
    });
    if (this.current_set < 30) {
      this.current_set += 1;
    } else {
      this.status = 'completed';
    }
    if (window.innerWidth > 375) {
      if (this.current_set % 3 === 1 && this.current_set > 3) {
        this.ngxSiemaService.next(3)
        .subscribe((data: any) => console.log(data));
      }
    } else {
      if (this.current_set % 2 === 1 && this.current_set > 2) {
          this.ngxSiemaService.next(2)
        .subscribe((data: any) => console.log(data));
      }
    }
  }
}
