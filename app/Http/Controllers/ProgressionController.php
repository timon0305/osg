<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ProgressionController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    public function getCalendarData(Request $request) {
        $program_id = $request['program_id'];
        $user = auth()->user();
        $result = DB::table('calendar')->where('user', $user->id)->where('program_id', $program_id)->get();
        return response()->json([
            'weeks' => $result,
            'program_id' => $program_id
        ]);
    }

    public function getPlan(Request $request) {
        $program_id = $request['program_id'];
        $user = auth()->user();

        $result = DB::table('plan')->where('user', $user->id)->where('program_id', $program_id)->get();
        return response()->json([
            'data' => $result,
            'program_id' => $program_id
        ]);
    }

    public function getWorkouts(Request $request) {
        $program_id = $request['program_id'];
        $user = auth()->user();
        $exercises = DB::table('exercises')
            ->leftJoin('exercises_bodypart', 'exercises.id', '=', 'exercises_bodypart.exercise_id')
            ->select('exercises.*', 'exercises_bodypart.bodypart_id');

        $bodyparts = DB::table('body_parts')
            ->rightJoinSub($exercises, 'exercises', function($join){
                $join->on('exercises.bodypart_id', '=', 'body_parts.id');
            })
            ->select('exercises.*', 'body_parts.name as bodypart_name');

        $sub = DB::table('workout')
            ->leftJoinSub($bodyparts, 'exercises', function($join){
                $join->on('workout.exercise', '=', 'exercises.id');
            })
            ->select('workout.*', 'exercises.name', 'exercises.movement', 'exercises.bodypart_name')
            ->where('workout.program_id', $program_id);

        $result = DB::table('workout_details')
            ->rightJoinSub($sub, 'sub', function($join) {
                $join->on('workout_details.workout', '=', 'sub.id');
            })
            ->select('workout_details.*', 'workout_details.id as detail_id', 'sub.*')
            ->where('workout_details.user', $user->id)
            ->get();
        return response()->json([
            'data' => $result
        ]);
    }

    public function duplicateFromCalendarBuilder(Request $request) {
        $program_id = $request['program_id'];
        $user = auth()->user();

        $result = DB::table('progression_calendar')->where('program_id', $program_id)->get();

        if($result->count() == 0) {

            $weeks = DB::table('calendar')->where('user', $user->id)->where('program_id', $program_id)->get();
            foreach($weeks as $tmp){
                $week = json_decode($tmp->data);
                $data = [];
                foreach($week as $day) {
                    if($day != null) {
                        $plan = DB::table('plan')->where('id', $day)->get()->first();
                        $plan_id = DB::table('progression_plan')->insertGetId([
                            'body_parts' => $plan->body_parts,
                            'user' => $plan->user,
                            'program_id' => $program_id
                        ]);
                        $data[] = $plan_id;

                        $workouts = DB::table('workout')->where('user', $user->id)->where('plan', $plan->id)->get();
                        foreach($workouts as $workout) {
                            $workout_id = DB::table('progression_workout')->insertGetId([
                                'exercise' => $workout->exercise,
                                'plan' => $plan_id,
                                'user' => $user->id,
                                'program_id' => $program_id
                            ]);

                            $workout_details = DB::table('workout_details')->where('user', $user->id)->where('workout', $workout->id)->get();
                            foreach($workout_details as $workout_detail) {
                                DB::table('progression_workout_details')->insert([
                                    'plan' => $plan_id,
                                    'workout' => $workout_id,
                                    'user' => $user->id,
                                    'reps' => $workout_detail->reps,
                                    'rtf' => $workout_detail->rtf,
                                    'rm' => $workout_detail->rm,
                                    'method' => $workout_detail->method,
                                    'tempo' => $workout_detail->tempo,
                                    'rest' => $workout_detail->rest
                                ]);
                            }
                        }
                    } else {
                        $data[] = null;
                    }
                }
                $tmp->data = json_encode($data);

                DB::table('progression_calendar')->insert([
                    'user' => $user->id,
                    'program_id' => $program_id,
                    'data' => $tmp->data,
                    'week_type' => $tmp->week_type
                ]);
            }
        } else {

        }

        $weeks = DB::table('progression_calendar')->where('user', $user->id)->where('program_id', $program_id)->get();
        $plans = DB::table('progression_plan')->where('user', $user->id)->where('program_id', $program_id)->get();
        // $workouts = DB::table('progression_workout')->where('user', $user->id)->where('program_id', $program_id)->get();

        $exercises = DB::table('exercises')
            ->leftJoin('exercises_bodypart', 'exercises.id', '=', 'exercises_bodypart.exercise_id')
            ->select('exercises.*', 'exercises_bodypart.bodypart_id');

        $bodyparts = DB::table('body_parts')
            ->rightJoinSub($exercises, 'exercises', function($join){
                $join->on('exercises.bodypart_id', '=', 'body_parts.id');
            })
            ->select('exercises.*', 'body_parts.name as bodypart_name');

        $sub = DB::table('progression_workout')
            ->leftJoinSub($bodyparts, 'exercises', function($join){
                $join->on('progression_workout.exercise', '=', 'exercises.id');
            })
            ->select('progression_workout.*', 'exercises.name', 'exercises.movement', 'exercises.bodypart_name')
            ->where('progression_workout.program_id', $program_id);

        $workouts = DB::table('progression_workout_details')
            ->rightJoinSub($sub, 'sub', function($join) {
                $join->on('progression_workout_details.workout', '=', 'sub.id');
            })
            ->select('progression_workout_details.*', 'progression_workout_details.id as detail_id', 'sub.*')
            ->where('progression_workout_details.user', $user->id)
            ->get();

        return response()->json([
            'program_id' => $program_id,
            'weeks' => $weeks,
            'plans' => $plans,
            'workouts' => $workouts,
            'result' => $result
        ]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
