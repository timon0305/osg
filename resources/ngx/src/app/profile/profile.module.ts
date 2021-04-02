import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { ModalModule } from 'ngx-bootstrap/modal';
import { Ng5SliderModule } from 'ng5-slider';

import { ProfileComponent } from './components/main.component';
import { PersonalTrainerComponent } from './components/personal-trainer/personal-trainer.component';
import { ProgramDesignerComponent } from './components/program-designer/program-designer.component';
import { StrengthAthleteComponent } from './components/strength-athlete/strength-athlete.component';
import { PersonalTrainerOffersComponent } from './components/personal-trainer/offers.component';
import { PersonalTrainerExperienceBankComponent } from './components/personal-trainer/experience-bank.component';
import { PersonalTrainerBookingCalendarComponent } from './components/personal-trainer/booking-calendar.component';
import { CoreModule } from '../core/core.module';
import { ProfileCoverComponent } from './components/profile/profile-cover.component';
import { ProfileAboutMeComponent } from './components/profile/profile-about-me-component';
import { StrengthAthleteTrophyWallComponent } from './components/strength-athlete/trophy-wall.component';
import { StrengthAthleteTimelineComponent } from './components/strength-athlete/timeline.component';
import { StrengthAthletePerformanceTableComponent } from './components/strength-athlete/performance-table.component';
import { StrengthAthleteTopProgramDesignsComponent } from './components/strength-athlete/top-program-designs.component';
import { StrengthAthleteTrainingCalendarComponent } from './components/strength-athlete/training-calendar.component';
import { ProgramDesignerPublishedProgramsComponent } from './components/program-designer/published-programs.component';
import { ProgramDesignerSavedProgramsComponent } from './components/program-designer/saved-programs.component';
import { ProgramDesignerProgramFilterComponent } from './components/program-designer/program-filter.component';
import { ProgramDesignerExperienceBankComponent } from './components/program-designer/experience-bank.component';
import { ProgramDesignerExperienceReviewsComponent } from './components/program-designer/experience-reviews.component';
import { ProgramDesignerProgressiveOverloadGraphComponent } from './components/program-designer/progressive-overload-graph.component';
import { ProgramDesignerProgramDesignComponent } from './components/program-designer/program-design.component';
import { ProgramDesignerTrainingCalendarComponent } from './components/program-designer/training-calendar.component';
import { StrengthAthleteTrophyComponent } from './components/strength-athlete/trophy.component';
import { StrengthAthletePerformanceComparisonComponent } from './components/strength-athlete/performance-comparison.component';
import { StrengthAthletePerformanceResultComponent } from './components/strength-athlete/performance-result.component';
import { StrengthAthletePerformanceSliderComponent } from './components/strength-athlete/performance-slider.component';
import { StrengthAthletePerformanceGraphComponent } from './components/strength-athlete/performance-graph.component';
import { StrengthAthleteModalComponent } from './components/strength-athlete/modal.component';
import { ProgramDesignerTrainingDayModalComponent } from './components/program-designer/training-day-modal/training-day-modal.component';
import { ProgramDesignerWriteReviewModalComponent } from './components/program-designer/write-review-modal/write-review-modal.component';
import { PersonalTrainerBookingDetailsModalComponent } from './components/personal-trainer/booking-details-modal/booking-details-modal.component';
import { UiSwitchModule } from 'ngx-toggle-switch';
import { ResponsiveModule } from 'ngx-responsive';
import { SimpleModalModule } from 'ngx-simple-modal';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { NgxSpinnerModule } from 'ngx-spinner';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

const modals = [
  ProgramDesignerTrainingDayModalComponent,
  ProgramDesignerWriteReviewModalComponent,
  PersonalTrainerBookingDetailsModalComponent,
  StrengthAthleteModalComponent
];

@NgModule({
  entryComponents: modals,
  declarations: [
    ProfileComponent,
    ProfileCoverComponent,
    ProfileAboutMeComponent,
    PersonalTrainerComponent,
    PersonalTrainerOffersComponent,
    PersonalTrainerExperienceBankComponent,
    PersonalTrainerBookingCalendarComponent,
    ProgramDesignerComponent,
    ProgramDesignerPublishedProgramsComponent,
    ProgramDesignerSavedProgramsComponent,
    ProgramDesignerProgramFilterComponent,
    ProgramDesignerExperienceBankComponent,
    ProgramDesignerExperienceReviewsComponent,
    ProgramDesignerProgressiveOverloadGraphComponent,
    ProgramDesignerProgramDesignComponent,
    ProgramDesignerTrainingCalendarComponent,
    StrengthAthleteComponent,
    StrengthAthleteTrophyWallComponent,
    StrengthAthleteTrophyComponent,
    StrengthAthleteTimelineComponent,
    StrengthAthletePerformanceTableComponent,
    StrengthAthletePerformanceComparisonComponent,
    StrengthAthletePerformanceResultComponent,
    StrengthAthletePerformanceSliderComponent,
    StrengthAthletePerformanceGraphComponent,
    StrengthAthleteTopProgramDesignsComponent,
    StrengthAthleteTrainingCalendarComponent,
    modals
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CoreModule,
    UiSwitchModule,
    Ng5SliderModule,
    SimpleModalModule,
    CarouselModule,
    ResponsiveModule.forRoot(),
    ModalModule.forRoot(),
    NgxSpinnerModule,
    NgbModule
  ],
  exports: [],
  providers: [],
})
export class ProfileModule { }
