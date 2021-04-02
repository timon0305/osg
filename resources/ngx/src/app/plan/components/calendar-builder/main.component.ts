import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { OwlOptions, SlidesOutputData } from 'ngx-owl-carousel-o';
import { NgxSiemaOptions, NgxSiemaService } from 'ngx-siema';
import { MessageService  } from '../../../core/services/data.service';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { DataService } from '../../../data.service';
import * as _swal from 'sweetalert';
import { SweetAlert } from 'sweetalert/typings/core';

export class CarouselData {
  id?: number;
  title: string;
  exercise: string;
  reps: number;
  rtf: number;
  rm: string;
  method: string;
  tempo: String;
  rest_period: string;
}

@Component({
  selector: 'osg-calendar-builder',
  templateUrl: './main.component.html'
})
export class CalendarBuilderComponent implements OnInit {

  get program() {
    return this.dataService.program;
  }
  set program(val) {
    this.dataService.program = val;
  }

  swal: SweetAlert = _swal as any;

  @Output() complete: EventEmitter<any> = new EventEmitter();

  customOptions: OwlOptions = {
    stagePadding: 0,
    loop: false,
    margin: 0,
    nav: false,
    dots: false,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    autoWidth: true,
    items: 1
  };
  activeSlides: SlidesOutputData;
  width: string;
  list: Array<{id: number, img: string, title: string, type: string, items: Array<string>}> = [
    {id: 0, img: '/images/exercise.png', title: 'Bench Press', type: 'Multi Joint Exercise', items: ['Chest', 'Triceps', 'Deltoids']},
    {id: 1, img: '/images/exercise.png', title: 'Pullups', type: 'Multi Joint Exercise', items: ['Lats', 'Biceps']},
    {id: 2, img: '/images/exercise.png', title: 'Leg Press', type: 'Single Joint Exercise', items: ['Hamstrings', 'Quadriceps']},
    {id: 3, img: '/images/exercise.png', title: 'Dead Lift', type: 'Multi Joint Exercise', items: ['Hamstrings', 'Quadriceps']},
    {id: 4, img: '/images/exercise.png', title: 'Squats', type: 'Single Joint Exercise', items: ['Hamstrings', 'Quadriceps']},
    {id: 5, img: '/images/exercise.png', title: 'Leg Extension', type: 'Single Joint Exercise', items: ['Hamstrings', 'Quadriceps']},
  ];
  selected_list: Array<{id: number, img: string, title: string, type: string, items: Array<string>}> = [];
  workouts: Array<{id: number, items: Array<string>}> = [
    {id: 1, items: ['chest', 'shoulders', 'triceps']},
    {id: 2, items: ['back', 'biceps']},
    {id: 3, items: ['quadriceps', 'hamstrings', 'calves']}
  ];
  isCollapsed: Array<boolean> = [];
  current_sets: Array<number>;
  options: Array<NgxSiemaOptions> = [];
  carouselData: CarouselData[] = [
    { id: 1, title: 'set 1', exercise: 'Bench Press', reps: 11, rtf: 1, rm: '-', method: 'Straight', tempo: '3-0-1', rest_period: '03:30'},
    { id: 2, title: 'set 2', exercise: 'Bench Press', reps: 11, rtf: 1, rm: '-', method: 'Straight', tempo: '3-0-1', rest_period: '03:30'},
    { id: 3, title: 'set 3', exercise: 'Bench Press', reps: 11, rtf: 1, rm: '-', method: 'Straight', tempo: '3-0-1', rest_period: '03:30'}
  ];

  constructor(private ngxSiemaService: NgxSiemaService, private http: HttpClient, private dataService: DataService, private service: MessageService) {}

  ngOnInit(): void {
    this.width = window.innerWidth.toString();
    if(this.program['is_saved'] == 2) {
      this.next();
    }
  }

  next() {
    console.log('cur_program = ', this.program);
    if(!this.program['is_saved']) {
      this.swal({
        title: 'Program is not saved!',
        text: 'The program should be saved before proceed to Progression Builder.',
        icon: 'error',
        buttons: {
            confirm : { text: 'OK', className: 'btn-yellow-gradient' }
        }
      });
      return;
    }
    this.complete.emit(null);
    this.service.sendMessage('proceed', '');
  }

  check(key, val) {
    this.selected_list.forEach((item, index) => {
      if (key === index) {
        this.selected_list.splice(index, 1);
      }
    });
    this.list.splice(val.id, 0, val);
  }

  selectedExercise(item) {
    this.selected_list.push(item);
    this.list.forEach((val, index) => {
      if (val.id === item.id) {
        this.list.splice(index, 1);
      }
    });
  }

  getPassedData(data: SlidesOutputData) {
    this.activeSlides = data;
    if (this.selected_list.length !== 0 && this.activeSlides.startPosition === 1) {
      this.options = [];
      this.current_sets = [];
      this.isCollapsed = [];
      this.selected_list.forEach((item, key) => {
        this.options.push(
          {
            selector: '.siema' + item.id,
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
          }
        );
        this.current_sets.push(1);
        this.isCollapsed.push(false);
      });
    }
  }

  owlCarPrev(owlCar) {
    owlCar.prev();
  }

  owlCarNext(owlCar) {
    // if (this.activeSlides.startPosition === 0) {
    //   if (this.selected_list.length > 0) {
    //     owlCar.next();
    //   } else {
    //     alert('Please select the exercise at least one.');
    //   }
    // } else {
      owlCar.next();
    // }
  }

  toggle(key) {
    this.isCollapsed.forEach((val, index) => {
      if (key === index) {
        this.isCollapsed[key] = !val;
      }
    });
  }
  onSaveProgram() {
    this.service.sendMessage('saveProgram', '');
  }
}
