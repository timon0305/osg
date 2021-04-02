import { Component, OnInit, Input } from '@angular/core';
import { ApplicationUser } from 'src/app/core/classes/user';

import * as c3 from 'c3';
import { stringify } from '@angular/core/src/util';
declare var $: any;

@Component({
  selector: 'osg-strength-athlete-trophy',
  templateUrl: './trophy.component.html'
})
export class StrengthAthleteTrophyComponent implements OnInit {
  public static counter: number = 0;
  private _id: number;
  @Input() applicationUser: ApplicationUser;
  @Input() title: string;
  @Input() gaugeCss: string;
  @Input() checkList: string[];

  data_count: number = 3;
  original_data: string[][] = [];
  constructor() {
    this._id = ++StrengthAthleteTrophyComponent.counter;
    this.original_data = [
      ['x', '0', '0.5', '1', '2', '2.5', '3', '4', '5', '6', '6.5', '7', '7.5', '8', '9', '9.5', '10'],
      ['data1', null, '75', '78', '83', null, null, null, null, null, null, null, null, null, null, null],
      ['data2', null, null, null, null, null, '90', '94', '98', '102', null, null, null, null, null, null],
      ['data3', null, null, null, null, null, null, null, null, null, null, '108', '115', '122', '135', null]
    ];
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    var chart = c3.generate({
      bindto: `#${this.performanceGraphId}`,
      size: {
        height: 300,
        width: 620
      },
      legend: {
        show: false
      },
      transition: {
        duration: 1000
      },
      data: {
        x: 'x',
        colors: {
          data1: '#F3A83B',
          data2: '#F3A83B',
          data3: '#F3A83B'
        },
        columns: this.original_data,
        types: {
          data1: 'area',
          data2: 'area',
          data3: 'area'
        }
      },
      axis: {
        x: {
          tick: {
            format: function (d) {
              switch (d) {
                case 0.5:
                  return "";
                case 2:
                  return "";
                case 3:
                  return "";
                case 6:
                  return "";
                case 7:
                  return "";
                case 9:
                  return "";
              }
            },
            values: [0.5, 2, 3, 6, 7, 9]
          }
        },
        y: {
          min: 0,
          max: 200,
          padding: {
            bottom: 0,
            top: 0
          },
          tick: {
            format: function (d) {
              switch (d) {
                case 75:
                  return "75"
                case 99:
                  return "99"
                case 127:
                  return "127"
                case 159:
                  return "159"
                case 193:
                  return "193"
              }
            },
            values: [75, 99, 127, 159, 193]
          },
          label: {
            text: 'Kg',
            position: 'outer-top',
          }
        },
        y2: {
          show: true,
          tick: {
            format: function (d) {
              switch (d) {
                case 0:
                  return "Time"
                case 0.375:
                  return "Untrained"
                case 0.495:
                  return "Novice"
                case 0.635:
                  return "Intermediate"
                case 0.795:
                  return "Advanced"
                case 0.965:
                  return "Elite"
              }
            },
            values: [0, 0.375, 0.495, 0.635, 0.795, 0.965]
          }
        }
      },
      grid: {
        x: {
          lines: [
            { value: 2.5, text: '' },
            { value: 6.5, text: '' }
          ]
        },
        y: {
          lines: [
            { value: 75, text: '' },
            { value: 99, text: '', class: 'label-5' },
            { value: 127, text: '', position: 'start' },
            { value: 159, text: '', position: 'start' },
            { value: 193, text: '', position: 'start' }
          ]
        }
      },
      tooltip: {
        show: false
      },
      onrendered: () => {
        $(`#${this.performanceGraphId}`).attr('style', 'max-height:430px;');
        let $lines = $(`#${this.performanceGraphId} .c3-chart-lines .c3-chart-line`);
        $.each($lines, (i, el) => {
          let $circles = $(el).find('.c3-circles .c3-circle').filter((i, c) => $(c).css('opacity') === "1");
          if($circles.length){
            let $first = $($circles[0]), $last = $($circles[$circles.length - 1]), $firstExtra, $lastExtra;
            $first.addClass('pretest');
            $last.addClass('posttest');
            $firstExtra = $first.clone();
            $lastExtra = $last.clone();
            $firstExtra.addClass('extra');
            $lastExtra.addClass('extra');
            $first.attr('r', 8);
            $last.attr('r', 8);
            $firstExtra.attr('r', 4);
            $lastExtra.attr('r', 4);
            $firstExtra.appendTo($(el).find('.c3-circles'));
            $lastExtra.appendTo($(el).find('.c3-circles'));
          }
        })
        $(`#${this.performanceGraphId} .c3`).children(':first-child').children(':nth-child(2)').attr('style', 'transform: translate(50px, 10px);');
        var circles = $(".c3-chart-lines > .c3-target-data1 > .c3-circles-data1");
        if (typeof circles[2] != 'undefined') {
          circles[2]['childNodes'].forEach((item) => {
            Object.keys(item['classList']).map((key, index) => {
              var class_names = Object.values(item['classList']);
              if (!class_names.includes('pretest') && !class_names.includes('posttest')) {
                Object.keys(item['attributes']).map((key, index) => {
                  if (item['attributes'][key].value.includes('opacity: 1')) {
                    var className = class_names[class_names.length-1];
                    $(".c3-chart-lines > .c3-target-data1 > .c3-circles-data1 > ."+className).attr('style', 'opacity: 0 !important;');
                  }
                });  
              }
            });
          });
        }
        var circles = $(".c3-chart-lines > .c3-target-data2 > .c3-circles-data2");
        if (typeof circles[2] != 'undefined') {
          circles[2]['childNodes'].forEach((item) => {
            Object.keys(item['classList']).map((key, index) => {
              var class_names = Object.values(item['classList']);
              if (!class_names.includes('pretest') && !class_names.includes('posttest')) {
                Object.keys(item['attributes']).map((key, index) => {
                  if (item['attributes'][key].value.includes('opacity: 1')) {
                    var className = class_names[class_names.length-1];
                    $(".c3-chart-lines > .c3-target-data2 > .c3-circles-data2 > ."+className).attr('style', 'opacity: 0 !important;');
                  }
                });  
              }
            });
          });
        }
        var circles = $(".c3-chart-lines > .c3-target-data3 > .c3-circles-data3");
        if (typeof circles[2] != 'undefined') {
          circles[2]['childNodes'].forEach((item) => {
            Object.keys(item['classList']).map((key, index) => {
              var class_names = Object.values(item['classList']);
              if (!class_names.includes('pretest') && !class_names.includes('posttest')) {
                Object.keys(item['attributes']).map((key, index) => {
                  if (item['attributes'][key].value.includes('opacity: 1')) {
                    var className = class_names[class_names.length-1];
                    $(".c3-chart-lines > .c3-target-data3 > .c3-circles-data3 > ."+className).attr('style', 'opacity: 0 !important');
                  }
                });  
              }
            });
          });
        }
      }
    });
    // var descriptions = "<div class='descriptions'>";
    // descriptions+="<div><span>Ladder Strength</span><span>01.03.18 - 30.04.18</span><span><b>5kg</b> increase</span></div>";
    // descriptions+="<div><span>Power Building</span><span>01.05.18 - 31.05.18</span><span><b>8kg</b> increase</span></div>";
    // descriptions+="<div><span>5x5</span><span>01.08.18 - 16.09.18</span><span><b>12kg</b> increase</span></div>";
    // descriptions+="</div>";
    // $(`#${this.performanceGraphId}`).append(descriptions);
  }


  get performanceGraphId(): string {
    return `performance-graph-${this._id}`;
  }

}
