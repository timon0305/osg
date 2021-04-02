import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { WorkoutDetailComponent } from './components/main.component';
import { WorkoutDetailProgressComponent } from './components/workout-detail/workout-detail-progress.component';
import { WorkoutDetailUpcomingComponent } from './components/workout-detail/workout-detail-upcoming.component';
import { WorkoutDetailCompleteComponent } from './components/workout-detail/workout-detail-complete.component';
import { NumbericSliderPurpleComponent } from './components/workout-detail/numberic-slider-purple.component';
import { NumbericSliderOrangeComponent } from './components/workout-detail/numberic-slider-orange.component';
import { NumbericSliderRedComponent } from './components/workout-detail/numberic-slider-red.component';
import { CoreModule } from '../core/core.module';
import { UiSwitchModule } from 'ngx-toggle-switch';
import { Ng5SliderModule } from 'ng5-slider';
import { NgxSiemaModule } from 'ngx-siema';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    WorkoutDetailComponent,
    WorkoutDetailUpcomingComponent,
    WorkoutDetailCompleteComponent,
    NumbericSliderPurpleComponent,
    NumbericSliderOrangeComponent,
    NumbericSliderRedComponent,
    WorkoutDetailProgressComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CoreModule,
    UiSwitchModule,
    Ng5SliderModule,
    NgbModule,
    NgxSiemaModule.forRoot()
  ],
  providers: [
    
  ],
})
export class WorkoutDetailModule { }
