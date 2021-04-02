import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  sharedData = [];
  weeks = [];
  calendar_list : any;
  week_types = [];
  plans = [];
  workouts = [];
  design_data = [];
  graph_data = [];
  cur_program_id = -1;
  program = {
    name: '',
    category: '',
    split: '',
    description: ''
  };
  first_program = {};

  cur_week = 0;
  cur_day = 0;
  cur_body_part = '';

  reviews = [];

  private weekdays = [
    'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'
  ];

  private parts = [
    'WAIST',
    'BACK',
    'UPPER ARMS',
    'THIGHS',
    'CHEST',
    'HIPS',
    'SHOULDERS',
    'FOREARMS',
    'CALVES'
  ];

  constructor() { }

  calculateStatistics() {
    var temp = [];
    this.parts.forEach(part => {
      temp.push({
        name: part,
        test_exercise: '',
        exercise_type: [],
        reps_min: -1,
        reps_max: -1,
        rm_min: -1,
        rm_max: -1,
        rtf_min: -1,
        rtf_max: -1,
        rest_min: -1,
        rest_max: -1,
        tempo_min: -1,
        tempo_max: -1,
        // sets_min: -1,
        // sets_max: -1
      });
    })
    this.sharedData.forEach(week => {
      week.forEach(day => {
        day.body_parts.forEach(body_part => {
          var idx = this.isInArrayWithProp(temp, 'name', body_part.name);
          if(idx >= 0) {
            body_part.exercises.forEach(exercise_set => {
              exercise_set.data.forEach(exercise => {
                if( this.isInArray(temp[idx].exercise_type, exercise.movement) < 0 ) {
                  temp[idx].exercise_type.push(exercise.movement);
                }

                if(parseInt(exercise.reps) < parseInt(temp[idx].reps_min) || temp[idx].reps_min == -1) {
                  temp[idx].reps_min = exercise.reps;
                }
                if(parseInt(exercise.reps) > parseInt(temp[idx].reps_max) || temp[idx].reps_max == -1) {
                  temp[idx].reps_max = exercise.reps;
                }

                if(parseFloat(exercise.rm) < parseFloat(temp[idx].rm_min) || temp[idx].rm_min == -1) {
                  temp[idx].rm_min = Math.round(parseFloat(exercise.rm));
                }
                if(parseFloat(exercise.rm) > parseFloat(temp[idx].rm_max) || temp[idx].rm_max == -1) {
                  temp[idx].rm_max = Math.round(parseFloat(exercise.rm));
                }

                if(parseInt(exercise.rtf) < parseInt(temp[idx].rtf_min) || temp[idx].rtf_min == -1) {
                  temp[idx].rtf_min = exercise.rtf;
                }
                if(parseInt(exercise.rtf) > parseInt(temp[idx].rtf_max) || temp[idx].rtf_max == -1) {
                  temp[idx].rtf_max = exercise.rtf;
                }

                if((temp[idx].rest_min != -1 && exercise.rest.length < temp[idx].rest_min.length && exercise.rest < temp[idx].rest_min) || temp[idx].rest_min == -1) {
                  temp[idx].rest_min = exercise.rest;
                }
                if((temp[idx].rest_max != -1 && exercise.rest.length > temp[idx].rest_max.length && exercise.rest > temp[idx].rest_max) || temp[idx].rest_max == -1) {
                  temp[idx].rest_max = exercise.rest;
                }

                if((temp[idx].tempo_min != -1 && exercise.tempo.length < temp[idx].tempo_min.length && exercise.tempo < temp[idx].tempo_min) || temp[idx].tempo_min == -1) {
                  temp[idx].tempo_min = exercise.tempo;
                }
                if((temp[idx].tempo_max != -1 && exercise.tempo.length > temp[idx].tempo_max.length && exercise.tempo > temp[idx].tempo_max) || temp[idx].tempo_max == -1) {
                  temp[idx].tempo_max = exercise.tempo;
                }

                if(exercise.method == '3') {
                  if(!temp[idx].test_exercise.includes(exercise.name)) {
                    temp[idx].test_exercise += exercise.name + ', ';
                  }
                }
              });
              // if(exercise_set.data.length < temp[idx].sets_min || temp[idx].sets_min == -1) {
              //   temp[idx].sets_min = exercise_set.data.length;
              // }
              // if(exercise_set.data.length > temp[idx].sets_max || temp[idx].sets_max == -1) {
              //   temp[idx].sets_max = exercise_set.data.length;
              // }
            });
          } else {
            temp.push({
              name: body_part.name,
              test_exercise: '',
              exercise_type: [],
              reps_min: -1,
              reps_max: -1,
              rm_min: -1,
              rm_max: -1,
              rtf_min: -1,
              rtf_max: -1,
              rest_min: -1,
              rest_max: -1,
              tempo_min: -1,
              tempo_max: -1,
              // sets_min: -1,
              // sets_max: -1
            });
            body_part.exercises.forEach(exercise_set => {
              exercise_set.data.forEach(exercise => {
                if( this.isInArray(temp[temp.length-1].exercise_type, exercise.movement) < 0 ) {
                  temp[temp.length-1].exercise_type.push(exercise.movement);
                }

                if(exercise.reps < temp[temp.length-1].reps_min || temp[temp.length-1].reps_min == -1) {
                  temp[temp.length-1].reps_min = exercise.reps;
                }
                if(exercise.reps > temp[temp.length-1].reps_max || temp[temp.length-1].reps_max == -1) {
                  temp[temp.length-1].reps_max = exercise.reps;
                }

                if(exercise.rm < temp[temp.length-1].rm_min || temp[temp.length-1].rm_min == -1) {
                  temp[temp.length-1].rm_min = exercise.rm;
                }
                if(exercise.rm > temp[temp.length-1].rm_max || temp[temp.length-1].rm_max == -1) {
                  temp[temp.length-1].rm_max = exercise.rm;
                }

                if(exercise.rtf < temp[temp.length-1].rtf_min || temp[temp.length-1].rtf_min == -1) {
                  temp[temp.length-1].rtf_min = exercise.rtf;
                }
                if(exercise.rtf > temp[temp.length-1].rtf_max || temp[temp.length-1].rtf_max == -1) {
                  temp[temp.length-1].rtf_max = exercise.rtf;
                }

                if(exercise.rest < temp[temp.length-1].rest_min || temp[temp.length-1].rest_min == -1) {
                  temp[temp.length-1].rest_min = exercise.rest;
                }
                if(exercise.rest > temp[temp.length-1].rest_max || temp[temp.length-1].rest_max == -1) {
                  temp[temp.length-1].rest_max = exercise.rest;
                }

                if(exercise.tempo < temp[temp.length-1].tempo_min || temp[temp.length-1].tempo_min == -1) {
                  temp[temp.length-1].tempo_min = exercise.tempo;
                }
                if(exercise.tempo > temp[temp.length-1].tempo_max || temp[temp.length-1].tempo_max == -1) {
                  temp[temp.length-1].tempo_max = exercise.tempo;
                }

                if(exercise.method == '3') {
                  if(!temp[temp.length-1].test_exercise.includes(exercise.name)) {
                    temp[temp.length-1].test_exercise +=exercise.name + ', ';
                  }
                }
              });
              // if(exercise_set.data.length < temp[temp.length-1].sets_min || temp[temp.length-1].sets_min == -1) {
              //   temp[temp.length-1].sets_min = exercise_set.data.length;
              // }
              // if(exercise_set.data.length > temp[temp.length-1].sets_max || temp[temp.length-1].sets_max == -1) {
              //   temp[temp.length-1].sets_max = exercise_set.data.length;
              // }
            });
          }
        });
      });
    });

    temp.forEach(bodypart => {
      bodypart.sets_min = -1;
      bodypart.sets_max = -1;
      bodypart.freq_min = -1;
      bodypart.freq_max = -1;
      this.sharedData.forEach(week => {
        var cnt_bodypart = 0;
        week.forEach(day => {
          day.body_parts.forEach(body_part => {
            var cnt = 0;
            if(bodypart.name == body_part.name) {
              cnt_bodypart++;
              body_part.exercises.forEach(exercise_set => {
                cnt += exercise_set.data.length;
              });
            }
            if(cnt != 0) {
              if(cnt < bodypart.sets_min || bodypart.sets_min == -1) {
                bodypart.sets_min = cnt;
              }
              if(cnt > bodypart.sets_max || bodypart.sets_max == -1) {
                bodypart.sets_max = cnt;
              }
            }
          });
        });
        if(cnt_bodypart < bodypart.freq_min || bodypart.freq_min == -1) {
          bodypart.freq_min = cnt_bodypart;
        }
        if(cnt_bodypart > bodypart.freq_max || bodypart.freq_max == -1) {
          bodypart.freq_max = cnt_bodypart;
        }
      });
    })

    this.design_data = temp;
    console.log('design data = ', temp);
    console.log('workouts = ', this.workouts);
    // this.isLoading = false;
  }

  isInArrayWithProp(ary, prop, val) {
    for(var i=0;i<ary.length;i++){
      if(ary[i][prop] == val) {
        return i;
      }
    }
    return -1;
  }
  isInArray(ary, val) {
    for(var i=0;i<ary.length;i++){
      if(ary[i] == val) {
        return i;
      }
    }
    return -1;
  }

  calculateOverloadGraphData() {
    this.design_data.forEach((bodypart, index) => {
      this.graph_data[index] = {
        name: bodypart.name,
        x: [],
        total_volume : ['total_volume'],
        total_load: ['total_load'],
        average_rm: ['average_rm'],
        frequency: ['frequency']
      }
      this.sharedData.forEach(week => {
          week.forEach((day, day_index) => {
          var flg = true;
          this.graph_data[index].x.push(this.weekdays[day_index]);
          day.body_parts.forEach((body_part, part_index) => {
            if(bodypart.name == body_part.name) {
              flg = false;
              this.graph_data[index].total_volume.push(body_part ? body_part.totalReps : null);
              this.graph_data[index].total_load.push(body_part ? body_part.totalLoad.toFixed(2) : null);
              this.graph_data[index].average_rm.push(body_part ? (body_part.totalRm / body_part.totalExercise).toFixed(2) : null);
            }
          });
          if(flg) {
            this.graph_data[index].total_volume.push(null);
            this.graph_data[index].total_load.push(null);
            this.graph_data[index].average_rm.push(null);
          }
        });
      });
    });
    console.log('graph data = ', this.graph_data);
    this.graph_data.forEach(body_part => {
      var freq = 0;
      body_part.frequency=["frequency"];
      var cnt = 0;
      body_part.average_rm.forEach((data, index) => {
        if(index != 0) {
          freq = data ? freq + 1 : freq;
          if(index % 7 == 0) {
            body_part.frequency.push(null);
            body_part.frequency[cnt-6] = freq ? freq : null;
            freq = 0;
          } else {
            body_part.frequency.push(null);
          }
        }
        cnt++;
      });
    })
  }
}
