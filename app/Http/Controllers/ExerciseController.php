<?php

namespace App\Http\Controllers;

use App\ExerciseFull;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ExerciseController extends Controller
{

    public function search(Request $request){

        $user = auth()->user();
        $keyword = $request->get('keyword', '');
        $program_id = $request->get('program_id', -1);
        $single = null;
        $multi = null;
        $exercise = [];
        if($keyword) {

            $movements = DB::table("movements")->get();
            foreach($movements as $i=>$movement){
                $exercises = DB::select("
                select '' as target_muscles, exercises.id as exercise_code, exercises.`name` exercise_name, exercises.temp_id, exercises.picture, exercises.movement, movements.`name` movement_name
                from (select * from exercises where movement = ".$movement->code." and exercise_info like '%".$keyword."%') exercises left join movements on movements.code = exercises.movement limit 0, 50");


                foreach($exercises as &$exer){
                    $exer->target_muscles = json_encode(DB::select("select muscle_id from exercises_target_muscle where exercise_id = ".$exer->exercise_code));
                    if(!file_exists(public_path()."/images/exercise/".$exer->temp_id.".png")){
                        $exer->picture = "/images/exercise/default.jpg";
                    }else{
                        $exer->picture = "/images/exercise/".$exer->temp_id.".png";
                    }
                }
                array_push($exercise, array("movement"=>$movement->name, "data"=>$exercises));
            }
        } else {

            $movements = DB::table("movements")->get();
            foreach($movements as $i=>$movement){
                $exercises = DB::select("
                select '' as target_muscles, exercises.id as exercise_code, exercises.`name` exercise_name, exercises.temp_id, exercises.picture, exercises.movement, movements.`name` movement_name
                from (select * from exercises where movement = ".$movement->code.") exercises left join movements on movements.code = exercises.movement limit 0, 50");

                foreach($exercises as &$exer){
                    $exer->target_muscles = json_encode(DB::select("select muscle_id from exercises_target_muscle where exercise_id = ".$exer->exercise_code));
                    if(!file_exists(public_path()."/images/exercise/".$exer->temp_id.".png")){
                        $exer->picture = "/images/exercise/default.jpg";
                    }else{
                        $exer->picture = "/images/exercise/".$exer->temp_id.".png";
                    }
                }
                array_push($exercise, array("movement"=>$movement->name, "data"=>$exercises));
            }
        }
        $program_record = DB::table("programs")->where(["user"=>$user->id])->where(["id"=>$program_id])->count();
        $program = array();
        if($program_record==0){
            $program = [
                'name' => '',
                'category' => '',
                'split' => '',
                'description' => '',
                'is_saved' => 0
            ];
        }
        else{
            $program_record = DB::table("programs")->where(["user"=>$user->id])->where(["id"=>$program_id])->first();
            $program = [
                'name' => $program_record->name,
                'category' => $program_record->category,
                'split' => $program_record->split,
                'description' => $program_record->description,
                'is_saved' => intVal($program_record->is_saved)
            ];
        }
        return response()->json([
            "success" => 0,
            "data" => [
                "exercise" => $exercise,
                "program" => $program
            ]
        ]);
    }

    public function removeWorkout(Request $request){
        $workoutId = $request->get('workoutId', null);
        if ($workoutId != null) {
            DB::table('workout')->where(['plan' => $workoutId])->delete();
            DB::table('workout_details')->where(['plan' => $workoutId])->delete();
            DB::table('plan')->where('id', $workoutId)->delete();
        }
        return response()->json([
            "success" => 0
        ]);
    }
    public function addWorkout(Request $request){
        $data = $request->get('data', '');
        $planId = $request->get('planId', null);
        $program_id = $request->get('program_id', -1);
        $body_parts = 'temp_parts';

        $user = auth()->user();
        if($planId == null) {
            DB::table('plan')->insert(['body_parts' => $body_parts, 'user' => $user->id, 'program_id' => $program_id]);
            $planId = DB::getPdo()->lastInsertId();
        } else {
            DB::table('workout')->where(['plan' => $planId])->delete();
            DB::table('workout_details')->where(['plan' => $planId])->delete();
        }

        $workoutIds = array();
        foreach($data as $workout){
            array_push($workoutIds, $workout['exercise_code']);
            DB::table('workout')->insert(['exercise' => $workout['exercise_code'], 'plan' => $planId, 'user' => $user->id, 'program_id' => $program_id]);
            $workout_id = DB::getPdo()->lastInsertId();
            foreach($workout['data'] as $workout_details){
                $workout_details['workout'] = $workout_id;
                $workout_details['plan'] = $planId;
                $workout_details['user'] = $user->id;
                DB::table('workout_details')->insert($workout_details);
            }
        }

        $body_parts = DB::select("SELECT B.name FROM exercises_bodypart as A ".
            "LEFT JOIN body_parts as B ON B.id = A.bodypart_id ".
            "WHERE A.exercise_id in (".
            implode(",", $workoutIds).
            ") GROUP BY B.name");

        $body = array();
        foreach($body_parts as $body_part) {
            array_push($body, $body_part->name);
        }

        DB::table('plan')->where("id", $planId)->update(['body_parts' => implode(" / ", $body)]);

        return response()->json([
            "success" => 0
        ]);
    }

    public function restapi(Request $request){
        $info = $request->get('info', '');
        $program_id = $request->get('program_id', -1);

        $user = auth()->user();
        if($info == "get-workout"){
            $workoutId = $request->get('workoutId', null);
            $workouts = DB::select("select workout.id, name, exercise exercise_code, false selected  from (select * from workout where plan = ".$workoutId.") workout LEFT JOIN exercises on exercises.id = workout.exercise");
            $workouts = json_decode(json_encode($workouts), true);
            $result = array();
            foreach($workouts as &$workout){
                $workout_details = DB::table('workout_details')->where(['workout' => $workout['id']])->get();
                $data = array();
                foreach($workout_details as $workout_detail){
                    array_push($data, [
                        'reps' => $workout_detail->reps,
                        'rtf' => $workout_detail->rtf,
                        'rm' => $workout_detail->rm,
                        'method' => $workout_detail->method,
                        'tempo' => $workout_detail->tempo,
                        'rest' => $workout_detail->rest
                    ]);
                }
                $workout['target_muscles'] = json_encode(DB::select("select muscle_id from exercises_target_muscle where exercise_id = ".$workout['exercise_code']));

                $workout['data'] = $data;
            }
            return response()->json([
                "success" => 0,
                "data" => $workouts
            ]);
        }else if($info == "get-plan"){
            $rtn = array();
            $workouts = DB::select("select id, body_parts from plan where user = ".$user->id." and program_id = ".$program_id);
            $calendars = DB::select("select data from calendar where user = ".$user->id." and program_id = ".$program_id);

            $calendar = array();
            foreach($calendars as $cal){
                $data = json_decode($cal->data);
                array_push($calendar, $data);
            }
            return response()->json([
                "success" => 0,
                "calendar" => $calendar,
                "workouts" => $workouts
            ]);
        }else if ($info == "save-program"){
            $calendar = $request->get('calendar', '');
            $program = $request->get('program', '');

            // DB::table('programs')->where(['user' => $user->id])->where(['id' => $program_id])->delete();
            DB::table('calendar')->where(['user' => $user->id])->where(['program_id' => $program_id])->delete();

            $program['user'] = $user->id;
            $program['is_saved'] = 1;
            DB::table('programs')->where('id', $program_id)->update($program);

            foreach($calendar as $data){
                DB::table('calendar')->insert(['data' => json_encode($data), 'user' => $user->id, 'program_id' => $program_id]);
            }
            return response()->json([
                "success" => 0,
                "program_id" => $program_id
            ]);
        }else if($info == "create-program"){
            DB::table('programs')->where(['is_saved' => 0])->delete();
            DB::table('programs')->insert([
                'user' => $user->id,
                'name' => 'New Program',
                'is_saved' => 0,
                'is_published' => 0
            ]);
            $program_id = DB::getPdo()->lastInsertId();
            return response()->json([
                "program_id" => $program_id
            ]);
        }else if($info == "publish-program"){
            DB::table('programs')->where('id', $program_id)->update([
                'is_published' => 1
            ]);
            return response()->json([
                'result' => 'success'
            ]);
        }else if($info == "get-programs"){
            $result = DB::table('programs')->where('is_published', 1)->get();

            foreach($result as $program){
                $weeks = DB::table('calendar')->where('user', $user->id)->where('program_id', $program->id)->get();
                $cnt = 0;
                foreach($weeks as $week){
                    $tmp = json_decode($week->data);
                    foreach($tmp as $day) {
                        if($day != null) {
                            $cnt++;
                        }
                    }
                }
                $program->workouts = $weeks->count() ? intval($cnt / $weeks->count()) : 0;
                $program->workout_ary = $weeks;
            }

            return response()->json([
                'data' => $result,
                'cnt' => $result->count()
            ]);
        }else if($info == 'get-saved-programs'){
            $result = DB::table('programs')
                ->where('user', $user->id)
                ->where('is_saved', '>', 0)
                ->get();

            foreach($result as $program){
                $weeks = DB::table('calendar')->where('user', $user->id)->where('program_id', $program->id)->get();
                $cnt = 0;
                foreach($weeks as $week){
                    $tmp = json_decode($week->data);
                    foreach($tmp as $day) {
                        if($day != null) {
                            $cnt++;
                        }
                    }
                }
                $program->workouts = $weeks->count() ? intVal($cnt / $weeks->count()) : 0;
                $program->workout_ary = $weeks;
            }

            return response()->json([
                'data' => $result,
                'cnt' => $result->count()
            ]);
        }else if($info == "save-program-progression"){
            $calendar = $request->get('calendar', null);
            $workouts = $request->get('workouts', null);
            $week_types = $request->get('week_types', null);
            $program = $request->get('program', '');

            $db_workouts = DB::table('progression_workout')->where('user', $user->id)->where('program_id', $program_id)->get();
            $temp_ary = [];

            foreach($db_workouts as $db_workout) {
                DB::table('progression_workout_details')->where('workout', $db_workout->id)->delete();

                $ind = false;
                foreach($workouts as $workout) {
                    if($db_workout->id == $workout['workout']) {
                        $ind = true;
                        break;
                    }
                }
                if($ind == false) {
                    $temp_ary[] = $db_workout;
                }
            }

            foreach($temp_ary as $temp) {
                DB::table('progression_workout')->where('id', $temp->id)->delete();
            }

            foreach($workouts as $workout) {
                DB::table('progression_workout_details')->insert([
                    'plan' => $workout['plan'],
                    'workout' => $workout['workout'],
                    'user' => $user->id,
                    'reps' => $workout['reps'],
                    'rtf' => $workout['rtf'],
                    'rm' => $workout['rm'],
                    'method' => $workout['method'],
                    'tempo' => $workout['tempo'],
                    'rest' => $workout['rest']
                ]);
            }

            // $program['user'] = $user->id;
            $program['is_saved'] = 2;
            DB::table('programs')->where('id', $program_id)->update($program);

            // $i = 0;
            // DB::table('calendar')->where(['user' => $user->id])->where(['program_id' => $program_id])->delete();
            // foreach($calendar as $data){
            //     DB::table('calendar')->insert(['data' => json_encode($data), 'week_type' => $week_types[$i], 'user' => $user->id, 'program_id' => $program_id]);
            //     $i++;
            // }

            // foreach($workouts as $workout) {
            //     DB::table('workout_details')->where('id', $workout['detail_id'])->update([
            //         'reps'=>$workout['reps'],
            //         'rest'=>$workout['rest'],
            //         'rm'=>$workout['rm'],
            //         'rtf'=>$workout['rtf'],
            //         'tempo'=>$workout['tempo'],
            //         'method'=>$workout['method']
            //     ]);
            // }
            return response()->json([
                'deleted_workouts' => $temp_ary,
                'calendar' => $calendar,
                'workouts' => $workouts,
                'result' => 'success'
            ]);
        } else if($info == 'write-review'){
            $content = $request->get('content_text', '');
            $score = $request->get('score', 0);

            DB::table('reviews')->insert([
                'user_name' => $user->name,
                'program_id' => $program_id,
                'content_text' => $content,
                'score' => $score
            ]);

            $result = DB::table('reviews')->where('program_id', $program_id)->orderBy('id', 'desc')->limit(5)->orderBy('id', 'asc')->get();

            return response()->json([
                'program_id' => $program_id,
                'data' => $result,
                'cnt' => $result->count()
            ]);
        } else if($info == 'read-reviews'){
            $result = DB::table('reviews')->where('program_id', $program_id)->orderBy('id', 'desc')->limit(5)->orderBy('id', 'asc')->get();
            $program = DB::table('programs')->where('id', $program_id)->get()->first();
            return response()->json([
                'program_id' => $program_id,
                'program' => $program,
                'data' => $result,
                'cnt' => $result->count()
            ]);
        }

    }
    public function test(Request $request){
        $exercises = DB::select("select * from exercises");

        foreach($exercises as &$exer){
            if(!file_exists(public_path()."/images/exercise/".$exer->temp_id.".png")){
                // $exer->picture = "/images/exercise/default.jpg";
                echo $exer->temp_id." ".$exer->name."<br/>";
            }
        }
        // $exercises = DB::table('list')->get();
        // $bodypart_data = DB::table('body_parts')->get();
        // $bodypart_data_arr = array();
        // foreach($bodypart_data as $data){
        //     $bodypart_data_arr[$data->name] = $data->code;
        // }

        // $equipment_data = DB::table('equipment_types')->get();
        // $equipment_data_arr = array();
        // foreach($equipment_data as $data){
        //     $equipment_data_arr[$data->name] = $data->code;
        // }

        // $muscle_data = DB::table('muscles')->get();
        // $muscle_data_arr = array();
        // foreach($muscle_data as $data){
        //     $muscle_data_arr[$data->name] = $data->code;
        // }
        // $muscle = array();
        // $bodypart = array();
        // $equipment = array();
        // $cnt = 0;
        // foreach($exercises as $exer){
        //     if($exer->Name != ""){
        //         $cnt++;
        //         $exer->Target = str_replace(" , ",", ",$exer->Target);
        //         $exer->Synergist = str_replace(" , ",", ",$exer->Synergist);
        //         if(substr($exer->Synergist, strlen($exer->Synergist) - 1, 1) == " "){
        //             $exer->Synergist = substr($exer->Synergist, 0, strlen($exer->Synergist) - 1);
        //         }
        //         if(substr($exer->Target, strlen($exer->Target) - 1, 1) == " "){
        //             $exer->Target = substr($exer->Target, 0, strlen($exer->Target) - 1);
        //         }

        //         // $movement = 4;
        //         // if($exer->Equipment == "Barbell" || $exer->Equipment == "EZ Barbell" || $exer->Equipment == "Olympic barbell" ){
        //         //     $movement = 1;
        //         // }else if($exer->Equipment == "Dumbbell"){
        //         //     $movement = 2;
        //         // }else if($exer->Equipment == "Cable" || $exer->Equipment == "Leverage machine" || $exer->Equipment == "Leverage machine, Resistance Band" || $exer->Equipment == "Sled machine" || $exer->Equipment == "Smith machine"){
        //         //     $movement = 3;
        //         // }
        //         // $picture = "images/exercise/".$exer->tempID."1103-".str_replace(" ","-",$exer->Name)."_".str_replace(" ","_",$exer->BodyPart)."_VIEW.jpg";
        //         // DB::table('exercises')->insert(array('name'=>$exer->Name, 'picture'=>$picture, 'temp_id'=>$exer->tempID, 'movement'=>$movement, 'exercise_info'=>($exer->Name." ".$exer->BodyPart." ".$exer->Target)));
        //         // echo $picture."<br/>";
        //         // $exer->Target = str_replace("arms", "Arms", $exer->Target);
        //         // $exer->Synergist = str_replace("arms", "Arms", $exer->Synergist);
        //         $exer->BodyPart = str_replace("Upper arms", "Upper Arms", $exer->BodyPart);
        //         if($exer->Target != ""){
        //             $temp = explode(", ", $exer->Target);
        //             foreach($temp as $t){
        //                 DB::table('exercises_target_muscle')->insert(array('exercise_id'=>$cnt, 'muscle_id'=>$muscle_data_arr[$t]));
        //                 $muscle[$t] = $exer->tempID;
        //             }
        //         }

        //         if($exer->Synergist != ""){
        //             $temp = explode(", ", $exer->Synergist);
        //             foreach($temp as $t){
        //                 DB::table('exercises_synergist_muscle')->insert(array('exercise_id'=>$cnt, 'muscle_id'=>$muscle_data_arr[$t]));
        //                 $muscle[$t] = $exer->tempID;
        //             }
        //         }
        //         if($exer->BodyPart != ""){
        //             $temp = explode(", ", $exer->BodyPart);
        //             foreach($temp as $t){
        //                 DB::table('exercises_bodypart')->insert(array('exercise_id'=>$cnt, 'bodypart_id'=>$bodypart_data_arr[$t]));
        //                 $bodypart[$t] = 1;
        //             }
        //         }


        //         if($exer->Equipment != ""){
        //             $temp = explode(", ", $exer->Equipment);
        //             foreach($temp as $t){
        //                 DB::table('exercises_equipment')->insert(array('exercise_id'=>$cnt, 'equipment_id'=>$equipment_data_arr[$t]));
        //                 $equipment[$t] = 1;
        //             }
        //         }
        //     }
        // }
        // $cnt = 0;
        // foreach($equipment as $i=>$data){
        //     if($i != ""){
        //         $cnt++;
        //         DB::table('equipment_types')->insert(array('name'=>$i, 'code'=>$cnt));
        //         echo $i."<br/>";
        //     }
        // }
        // foreach($bodypart as $i=>$data){
        //     if($i != ""){
        //         $cnt++;
        //         DB::table('body_parts')->insert(array('name'=>$i, 'code'=>$cnt));
        //         echo $i."<br/>";
        //     }
        // }
        // foreach($muscle as $i=>$data){
        //     if($i != ""){
        //         $cnt++;
        //         DB::table('muscles')->insert(array('name'=>$i, 'code'=>$cnt));
        //         echo $i."k".$data."<br/>";
        //     }
        // }

    }
}
