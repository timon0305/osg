import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { WorkoutLogComponent } from './components/main.component';
import { ModalComponent } from './components/modal.component';
import { WorkoutListComponent } from './components/workout-list/workout-list.component';
import { CoreModule } from '../core/core.module';
import { SimpleModalModule } from 'ngx-simple-modal';

const modals = [
  ModalComponent
];
@NgModule({
  entryComponents: modals,
  declarations: [
    WorkoutLogComponent,
    WorkoutListComponent,
    modals
  ],
  imports: [
    BrowserModule,
    CoreModule,
    SimpleModalModule
  ],
  providers: [],
})
export class WorkoutLogModule { }
