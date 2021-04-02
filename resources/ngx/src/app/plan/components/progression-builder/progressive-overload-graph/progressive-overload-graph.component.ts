import { Component, OnInit, Input } from '@angular/core';
import { ApplicationUser } from 'src/app/core/classes/user';
import { DataService } from '../../../../data.service';

import * as c3 from 'c3';
declare var $: any;
@Component({
    selector: 'osg-progression-builder-progressive-overload-graph',
    templateUrl: './progressive-overload-graph.component.html'
})
export class ProgressionBuilderProgressiveOverloadGraphComponent implements OnInit {

    public static counter: number = 0;
    private _id: number;
    graph_page_num = 0;
    rendered_graph_data = {
      total_volume: [],
      average_rm: [],
      total_load: [],
      frequency: []
    };
    rendered_weeks = [];

    private _cur_index = 0;

    get graph_data() {
      return this.dataService.graph_data;
    }
    set graph_data(val) {
      this.dataService.graph_data = val;
    }

    get weeks() {
      return this.dataService.weeks;
    }

    get week_types() {
      return this.dataService.week_types;
    }

    get cur_index() {
      return this._cur_index;
    }
    set cur_index(val) {
      this._cur_index = val;
      this.ngAfterViewInit();
    }

    get cur_body_part() {
      return this.dataService.cur_body_part;
    }
    set cur_body_part(val) {
      this.dataService.cur_body_part = val;
    }

    @Input() applicationUser: ApplicationUser;

    constructor(private dataService: DataService) {
        this._id = ++ProgressionBuilderProgressiveOverloadGraphComponent.counter;
    }

    ngOnInit(): void {
      var timer = setInterval(() => {
        if(this.graph_data.length) {
          clearInterval(timer);
          this.cur_index = 0;
          this.cur_body_part = this.graph_data[this.cur_index].name;
        }
      }, 100);
    }


    ngAfterViewInit(): void {
      var self = this;
      var timer = setInterval(() => {
        if(this.graph_data.length) {
          this.cur_body_part = this.graph_data.length ? this.graph_data[this.cur_index].name : '';
          this.rendered_graph_data = {
            total_volume: ['total_volume'],
            average_rm: ['average_rm'],
            total_load: ['total_load'],
            frequency: ['frequency']
          };
          this.rendered_weeks = [];
          for(var i = this.graph_page_num; i < Math.min(this.graph_page_num+4, this.weeks.length); i++){
            this.rendered_weeks.push(this.weeks[i]);
            for(var j = 0; j < 7; j ++){
              this.rendered_graph_data.total_volume.push(this.graph_data[this.cur_index].total_volume[i*7+j+1]);
              this.rendered_graph_data.average_rm.push(this.graph_data[this.cur_index].average_rm[i*7+j+1]);
              this.rendered_graph_data.total_load.push(this.graph_data[this.cur_index].total_load[i*7+j+1]);
              this.rendered_graph_data.frequency.push(this.graph_data[this.cur_index].frequency[i*7+j+1]);
            }
          }
          console.log('rendered_graph_data = ', this.rendered_graph_data);
          var chart = c3.generate({
              bindto: `#${this.progressiveOverloadGraphId}`,
              size: {
                  height: 300
              },
              legend: {
                  show: false
              },
              line: {
                connectNull: true,
              },

              grid: {
                x: {
                  lines:
                    this.rendered_weeks.map((item, index)=>{
                      return {value: (index+1) * 7 - 0.5 }
                    })
                }
              },

              transition: {
                duration: 1000
              },
              point:{
                r: 10,
                show: false
              },
              data: {
                  // x: 'x',
                  colors: {
                      total_volume: '#128cf3',
                      average_rm: '#e91212',
                      total_load: '#4fb100',
                      frequency: '#4fb100'
                  },
                  columns: this.graph_data.length ? [
                    this.rendered_graph_data.total_volume,
                    this.rendered_graph_data.average_rm,
                    this.rendered_graph_data.total_load,
                    this.rendered_graph_data.frequency
                  ] : [],
                  axes: {
                      total_volume: 'y2',
                      average_rm: 'y2',
                      total_load: 'y',
                      frequency: 'y2'
                  },
                  types:{
                      frequency: 'scatter'
                  },
              },
              axis: {
                y2: {
                  min: 0,
                  max: 130,
                  show: false
                },
                x: {
                  height: 30,
                  type: 'category',
                  // categories: this.graph_data[this.cur_index] ? this.graph_data[this.cur_index].x : [],
                  tick: {
                    format: function(x) {
                      if(typeof x == 'number') {
                        return self.graph_data[self.cur_index].x[x];
                      }
                    }
                  }
                }
              },
          });
          clearInterval(timer);
        }
      },100);
    }


    get progressiveOverloadGraphId(): string {
        return `performance-graph-${this._id}`;
    }

    onGraphNext = () => {
      if(this.graph_page_num+4 < this.weeks.length) {
        this.graph_page_num += 4;
        this.ngAfterViewInit();
      }
    }

    onGraphPrev = () => {
      if(this.graph_page_num-4 >= 0) {
        this.graph_page_num -= 4;
        this.ngAfterViewInit();
      }
    }

}
