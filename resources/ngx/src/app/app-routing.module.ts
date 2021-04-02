import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProfileComponent } from './profile/components/main.component';
import { PlanBuilderComponent } from './plan/components/main.component';
import { DashboardComponent } from './dashboard/components/main.component';
import { ContactsComponent } from './contacts/components/main.component';
import { InformationComponent } from './core/components/info/info.component';
import { NotificationsComponent } from './core/components/notifications/notifications.component';
import { ExperienceBankComponent } from './experience-bank/components/main.component';
import { StrengthStandardsComponent } from './strength-standards/components/main.component';
import { WorkoutLogComponent } from './workout-log/components/main.component';
import { WorkoutDetailComponent } from './workout-detail/components/main.component';
import { InterviewComponent } from './interview/components/main.component';
// import { NewsFeedComponent } from './core/components/news-feed/news-feed-component';
import { NewsfeedComponent } from './newsfeed/components/main.component';
import { ReviewsComponent } from './reviews/components/main.component';

const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'calendar-builder', component: PlanBuilderComponent},
  { path: 'experience-bank', component: ExperienceBankComponent},
  { path: 'strength-standards', component: StrengthStandardsComponent},
  { path: 'program-designs', component: InformationComponent},
  { path: 'workout-log', component: WorkoutLogComponent},
  { path: 'workout-detail/:date/:status', component: WorkoutDetailComponent},
  { path: 'contacts', component: ContactsComponent},
  { path: 'profile', component: ProfileComponent },
  { path: 'profile/:handle', component: ProfileComponent },
  { path: 'notifications', component: NotificationsComponent },
  { path: 'info', component: InformationComponent },
  { path: 'interview', component: InterviewComponent },
  { path: 'unknown', component: InformationComponent },
  { path: 'newsfeed', component: NewsfeedComponent },
  { path: 'reviews', component: ReviewsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
