import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'osg-strength-athlete-performance-result',
  templateUrl: './performance-result.component.html'
})
export class StrengthAthletePerformanceResultComponent implements OnInit{
  
  @Input() title: string = '';
  @Input() type: string = '';
  @Input() value: number;
  @Input() color: string = '';

  ngOnInit(): void {
    
  }

}
