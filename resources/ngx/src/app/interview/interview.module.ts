import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { InterviewComponent } from './components/main.component';
import { CoreModule } from '../core/core.module';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { FormsModule } from '@angular/forms';
import { ResponsiveModule } from 'ngx-responsive';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
@NgModule({
  declarations: [
    InterviewComponent,
  ],
  imports: [
    BrowserModule,
    CoreModule,
    FormsModule,
    CarouselModule,
    NgbModule,
    ResponsiveModule.forRoot()
  ],
  providers: [],
})
export class InterviewModule { }
