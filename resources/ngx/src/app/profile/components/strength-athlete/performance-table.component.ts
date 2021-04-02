import { Component, OnInit, Input } from '@angular/core';
import { ApplicationUser } from 'src/app/core/classes/user';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'osg-strength-athlete-performance-table',
  templateUrl: './performance-table.component.html'
})
export class StrengthAthletePerformanceTableComponent implements OnInit{

  @Input() applicationUser: ApplicationUser;

  comparisons: string[] = ['bench press', 'squats', 'deadlift'];
  results: Array<{title: string, type: string, value: number, color: string}> = [
    {title:'program', type:'program', value:0, color: ''},
    {title:'bench press', type:'bench', value:8, color: 'blue'},
    {title:'squat', type:'squat', value:45, color: 'orange'},
    {title:'deadlift', type:'dead', value:57, color: 'green'}
  ];
  mobile_program_result:{title: string, type: string, value: number, color: string} = {
    title:'program', type:'program', value:0, color: ''
  };
  mobile_results: Array<{title: string, type: string, value: number, color: string}> = [
    {title:'bench press', type:'bench', value:8, color: 'blue'},
    {title:'squat', type:'squat', value:45, color: 'orange'},
    {title:'deadlift', type:'dead', value:57, color: 'green'}
  ];
  sliders: Array<{title: string, value: number, color: string}> = [
    {title:'sleep', value:6, color: 'purple'},
    {title:'stress press', value:8, color: 'red'},
    {title:'energy', value:7, color: 'orange'}
  ];
  auto_reg: boolean = false;
  customOptions: OwlOptions = {
    stagePadding: 0,
    loop:true,
    margin:0,
    nav:false,
    dots:true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    autoWidth: true,
    items: 1
  }
  width: string;

  variables:{age: number, muscle_type: string, height: string, gender: string}  = {
    age: 0, muscle_type: '', height: '0', gender: ''
  };

  ngOnInit(): void {
    if(this.applicationUser != null) {
      // if (this.applicationUser.profile != null) {
      //   let currentDate = new Date();
      //   var birthDate = this.applicationUser.profile.birth.split("/")[2];
      //   this.variables.age = currentDate.getFullYear() - birthDate;
      //   this.variables.muscle_type = this.applicationUser.profile.muscle_type;
      //   this.variables.height = this.applicationUser.profile.height;
      //   this.variables.gender = this.applicationUser.profile.gender;
      // }
    }

    this.width = window.innerWidth.toString();
  }

  onChangeAutoReg(val) {
    this.auto_reg = val;
  }

}
