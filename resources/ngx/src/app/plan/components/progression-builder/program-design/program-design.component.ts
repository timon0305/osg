import { Component, OnInit, Input } from '@angular/core';
import { ApplicationUser } from 'src/app/core/classes/user';
import { DataService } from '../../../../data.service';

@Component({
    selector: 'osg-progression-builder-program-design',
    templateUrl: './program-design.component.html'
})
export class ProgressionBuilderProgramDesignComponent implements OnInit {

  movement = ['Barbell', 'Dumbbell', 'Cable/Machine', 'Other'];
  model_option = [
    'Intensity',
    'Volume',
    'Frequency',
    'Intensity-, Volume-, Frequency',
    'Intensity-, Volume',
    'Volume-, Frequency',
    'Intensity, Frequency',
  ];

    @Input() applicationUser: ApplicationUser;

    get data() {
      return this.dataService.sharedData;
    }
    set data(val) {
      this.dataService.sharedData = val;
    }
    get design_data() {
      return this.dataService.design_data;
    }
    set design_data(val) {
      this.dataService.design_data = val;
    }

    constructor(private dataService: DataService) {}

    ngOnInit(): void {

    }

    drawExerciseType(ary) {
      var res = '';
      ary.forEach(type => {
        res += this.movement[type-1] + ', ';
      });
      return res;
    }

}
