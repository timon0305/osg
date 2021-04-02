import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReviewsComponent } from './components/main.component';
import { CoreModule } from '../core/core.module';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { FormsModule } from '@angular/forms';
import { ResponsiveModule } from 'ngx-responsive';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { NgxSpinnerModule } from "ngx-spinner";
import { MentionModule } from 'angular-mentions';

@NgModule({
  declarations: [
    ReviewsComponent,
  ],
  imports: [
    BrowserModule,
    CoreModule,
    FormsModule,
    CarouselModule,
    NgbModule,
    ResponsiveModule.forRoot(),
    NgxDropzoneModule,
    NgxSpinnerModule,
    MentionModule
  ],
  providers: [],
})
export class ReviewsModule { }
