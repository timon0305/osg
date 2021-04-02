import { Component, OnInit, Input } from '@angular/core';
import { ApplicationUser } from 'src/app/core/classes/user';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { DataService } from '../../../data.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ProgramDesignerWriteReviewModalComponent } from './write-review-modal/write-review-modal.component';

@Component({
  selector: 'osg-program-designer-experience-reviews',
  templateUrl: './experience-reviews.component.html'
})
export class ProgramDesignerExperienceReviewsComponent implements OnInit{

  @Input() applicationUser: ApplicationUser;

  get first_program() {
    return this.dataService.first_program;
  }
  set first_program(val) {
    this.dataService.first_program = val;
  }

  get reviews() {
    return this.dataService.reviews;
  }
  set reviews(val) {
    this.dataService.reviews = val;
  }

  bsModalRef: BsModalRef;
  constructor(private modalService: BsModalService, private spinner: NgxSpinnerService, private http: HttpClient, private dataService: DataService) {}

  customOptions: OwlOptions = {
    stagePadding: 0,
    loop:true,
    margin:0,
    nav:false,
    dots:true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    autoWidth: true,
    items: 1
  }
  // reviews: Array<Number>;
  width: string;

  // reviews: [];
  user_name: '';
  rate_value = [
    'zero', 'worst', 'worse', 'middle', 'good', 'excellent'
  ];

  ngOnInit(): void {
    // this.reviews = Array(5).fill(5).map((x,i)=>i);
    this.width = window.innerWidth.toString();

    // var interval = setInterval(()=>{
    //   if(this.first_program['id']){
    //     clearInterval(interval);
    //     this.spinner.show();
    //     this.http.post('program/restapi?info=read-reviews', {program_id: this.first_program['id']}, {
    //       headers: new HttpHeaders({
    //         'Content-Type': 'application/json',
    //       })
    //     })
    //     .subscribe(resp => {
    //       console.log('read reviews = ', resp);
    //       this.reviews = resp['data'];
    //       this.user_name = resp['user_name'];
    //       this.spinner.hide();
    //     });
    //   }
    // }, 100);
  }

  onWriteReview() {
    this.bsModalRef = this.modalService.show(
      ProgramDesignerWriteReviewModalComponent,
      {
          class: 'review-modal',
      }
    );
  }

  viewAllReviews() {
    window.location.href="/#/reviews?program_id="+this.first_program['id'];
  }

}
