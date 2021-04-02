import { Component, OnInit, Input } from '@angular/core';
import { ApplicationUser } from 'src/app/core/classes/user';

import * as c3 from 'c3';
declare var $: any;

@Component({
    selector: 'osg-strength-athlete-performance-graph',
    templateUrl: './performance-graph.component.html'
})
export class StrengthAthletePerformanceGraphComponent implements OnInit {

    @Input() applicationUser: ApplicationUser;

    constructor() {
    }

    ngOnInit(): void {
        var chart = c3.generate({
            bindto: `#performance-graph`,
            size: {
                height: 300,
                width: 1250
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
                    data1: '#e91212',
                    data2: '#6f42c1',
                    data3: '#007bff',
                    data4: '#f8ef41'
                },
                columns: [
                    ['x', '2000-01-01', '2001-01-01', '2002-01-01', '2003-01-01', '2004-01-01', '2005-01-01', '2006-01-01', '2007-01-01', '2008-01-01', '2009-01-01', '2010-01-01', '2011-01-01', '2012-01-01', '2013-01-01', '2014-01-01', '2015-01-01', '2016-01-01', '2017-01-01', '2018-01-01', '2019-01-01', '2020-01-01', '2021-01-01', '2022-01-01', '2023-01-01', '2024-01-01', '2025-01-01', '2026-01-01', '2027-01-01', '2028-01-01', '2029-01-01', '2030-01-01', '2031-01-01', '2032-01-01', '2033-01-01', '2034-01-01'],
                    ['data1', 2.5, 2.1, 1.7, 1.9, 2.1, 1.9, 1.7, 1.5, 1.3, 1.1, 0.1, -0.9, -1.1, -1.3, -1.5, -1.7, -2.1, -2.5, -2.9, -2.6, -0.1, 2.4, 2.2, 2.0, 1.8, 1.6, 1.9, 2.2, 2.5, 2.8, 3.1, 3.4, 3.7, 4.0, 4.1],
                    ['data2', 3.0, 3.2, 3.3, 3.5, 3.4, 3.3, 3.2, 3.1, 3.0, 2.6, 2.2, 1.9, 2.1, 2.3, 2.5, 2.3, 2.2, 2.1, 1.9, 1.4, 0, -1.4, -1.7, -2.0, -2.3, -1.7, -1.1, 0.5, 1.1, 1.7, 1.9, 2.1, 2.3, 2.5, 2.6],
                    ['data3', 2.3, 0, 1.3, 0, 2.0, 0, 0, 1.3, 0, 0.6, 0, -0.5, 0, 0, -1.0, 0, -1.5, 0, -2, 0, 0, -0.5, 0, -1.0, 0, 0.5, 0, 0, 0.7, 0, 1.5, 0, 1.0, 0, 0],
                    ['data4', -0.8, -0.8, -0.8, -0.1, 0.6, 1.3, 2.0, 2.7, 3.4, 3.6, 3.8, 4.0, 4.2, 4.4, 3.9, 3.4, 3.5, 3.6, 3.7, 3.8, 3.9, 3.8, 3.7, 3.6, 3.7, 3.8, 3.9, 4.0, 4.1, 4.2, 4.1, 4.0, 4.1, 4.4, 4.7],
                ],
                axes: {
                    data1: 'y',
                    data2: 'y',
                    data3: 'y',
                    data4: 'y'
                },
                types:{
                    data3: 'bar'
                }
            },
            axis: {
                x: {
                    type: 'timeseries',
                    tick: {
                        culling: false,
                        rotate: 90,
                        format: (x: Date): string => {
                            let s = `${x.getFullYear()}-01-01`;
                            let v = ['2000-01-01', '2001-01-01', '2002-01-01', '2003-01-01', '2004-01-01', '2005-01-01', '2006-01-01', '2006-06-06', '2007-01-01', '2008-01-01', '2009-01-01', '2010-01-01', '2011-01-01', '2012-01-01', '2013-01-01', '2013-06-06', '2014-01-01', '2015-01-01', '2016-01-01', '2017-01-01', '2018-01-01', '2019-01-01', '2020-01-01', '2020-06-06', '2021-01-01', '2022-01-01', '2023-01-01', '2024-01-01', '2025-01-01', '2026-01-01', '2027-01-01', '2027-06-06', '2028-01-01', '2029-01-01', '2030-01-01', '2031-01-01', '2032-01-01', '2033-01-01', '2034-01-01'];
                            let l = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun', '', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun', '', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun', '', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun', '', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
                            let idx = v.indexOf(s);
                            return l[idx];
                        },
                    },
                    height: 50
                },
                y: {
                    min: -5,
                    max: 5,
                    tick: {
                        format: function (d) {
                          switch (d) {
                            case -6:
                              return "0"
                            case 0:
                              return "5"
                            case 5:
                              return "10"
                          }
                        },
                        values: [-6, 0, 5]
                    }
                }
            },
            bar: {
                width: {
                  ratio: 0.5
                }
            },
            grid: {
                x: {
                  lines: [
                    {value: '2006-06-06', text: ''},
                    {value: '2013-06-06', text: '', class: 'label-5'},
                    {value: '2020-06-06', text: '', position: 'start'},
                    {value: '2027-06-06', text: '', position: 'start'}
                  ]
                },
                y: {
                    lines: [
                      { value: 0, text: '' },
                      { value: 5, text: '' }
                    ]
                }
            },
            onrendered: function () {
                let $graphic = $(`.fatigue-graph #performance-graph svg g`);
                $($graphic[0]).attr("style", "transform: translate(40px, 4.5px);");

                $(".fatigue-graph #performance-graph .c3-chart > .c3-event-rects").attr('style', 'fill-opacity: 1');
                $(".fatigue-graph #performance-graph .c3-chart > .c3-event-rects > .c3-event-rect").attr('y', '20').attr('width', '1209').attr('height', '103').attr('style', 'fill: #f1f7e2');
                var rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
                rect.setAttribute('x', '0');
                rect.setAttribute('y', '123');
                rect.setAttribute('width', '1209');
                rect.setAttribute('height', '123');
                rect.setAttribute('style', 'fill: #ffead1;');
                $(".fatigue-graph #performance-graph .c3-chart > .c3-event-rects ").append(rect);
                let $x_axis = $(`.fatigue-graph #performance-graph .c3-axis-x`);
                $.each($x_axis, (i, el) => {
                    let $ticks = $(el).find('.tick');
                    $.each($ticks, (j, els) => {
                        var temp = $(els).attr('transform').split(' ');
                        var origin_transform = temp[0].slice(0,-1);
                        $(els).attr('style', 'transform: ' + origin_transform + "px, -4px);");
                        $(els).find('line').attr('y2', '8').attr('style', 'stroke-width: 2px');
                        $(els).find('text').attr("style", "text-anchor: start;").attr("style", "display: block;").attr("style", "transform: rotate(90deg) translate(18px, 0px);");
                    });
                });
                let $data_1 = $(`.fatigue-graph #performance-graph .c3-circles-data1 > circle`);
                $.each($data_1, (i, el) => {
                    $(el).attr('style', 'opacity: 0');
                });
                let $data_2 = $(`.fatigue-graph #performance-graph .c3-circles-data2 > circle`);
                $.each($data_2, (i, el) => {
                    $(el).attr('style', 'opacity: 0');
                });
                let $data_4 = $(`.fatigue-graph #performance-graph .c3-circles-data4 > circle`);
                $.each($data_4, (i, el) => {
                    $(el).attr('style', 'opacity: 0');
                });
            }
        });
    }
}
