import { Component, OnInit, Input } from '@angular/core';
import { Options } from 'ng5-slider';

@Component({
  selector: 'osg-strength-athlete-performance-slider',
  templateUrl: './performance-slider.component.html'
})
export class StrengthAthletePerformanceSliderComponent implements OnInit{
  
  @Input() title: string='';
  @Input() value: number;
  @Input() color: string='';
  options: Options = {
    disabled: true,
    showTicksValues: true,
    floor: 0,
    ceil: 10,
    stepsArray: [
      {value: 0, legend: 'Poor'},
      {value: 1},
      {value: 2},
      {value: 3},
      {value: 4},
      {value: 5, legend: 'Good'},
      {value: 6},
      {value: 7},
      {value: 8},
      {value: 9},
      {value: 10, legend: 'Excellent'},
    ]
  };
  ngOnInit(): void {
    
  }

  increase() {
    if (this.value < 11) {
      this.value ++;
    }
  }

  decrease() {
    if (this.value > 0) {
      this.value --;
    }
  }
}
