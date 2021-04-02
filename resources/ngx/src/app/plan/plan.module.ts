import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { CoreModule } from '../core/core.module';
import {NgxMaskModule} from 'ngx-mask';
import { ResponsiveModule } from 'ngx-responsive';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { NgxSiemaModule } from 'ngx-siema';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { PlanBuilderComponent } from './components/main.component';
import { PlanBuilderExercisesComponent } from './components/calendar-builder/exercises/exercises.component';
import { PlanBuilderWorkoutsComponent } from './components/calendar-builder/workouts/workouts.component';
import { PlanBuilderCalendarComponent } from './components/calendar-builder/calendar/calendar.component';
import { CalendarBuilderComponent } from './components/calendar-builder/main.component';
import { ProgressionBuilderComponent } from './components/progression-builder/main.component';
// tslint:disable-next-line: max-line-length
import { ProgressionBuilderProgressiveOverloadGraphComponent } from './components/progression-builder/progressive-overload-graph/progressive-overload-graph.component';
import { ProgressionBuilderTrainingProgramComponent } from './components/progression-builder/training-program/training-program.component';
import { ProgressionBuilderProgramDesignComponent } from './components/progression-builder/program-design/program-design.component'
import {ReactiveFormsModule} from "@angular/forms";

import { FormsModule } from '@angular/forms';

import { NgxSpinnerModule } from "ngx-spinner";

@NgModule({
  declarations: [
    PlanBuilderComponent,
    CalendarBuilderComponent,
    PlanBuilderExercisesComponent,
    PlanBuilderWorkoutsComponent,
    PlanBuilderCalendarComponent,

    ProgressionBuilderComponent,
    ProgressionBuilderProgressiveOverloadGraphComponent,
    ProgressionBuilderTrainingProgramComponent,
    ProgressionBuilderProgramDesignComponent
  ],
  imports: [
    BrowserModule,
    CoreModule,
    CarouselModule,
    ResponsiveModule,
    NgbModule,
    NgxSiemaModule,
    NgxMaskModule.forRoot(),
    ReactiveFormsModule,
    FormsModule,
    NgxSpinnerModule
  ],
  providers: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class PlanBuilderModule { }
