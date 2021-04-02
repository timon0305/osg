import { Component, OnInit, Input, NgZone } from '@angular/core';
import { ApplicationUser } from '../../core/classes/user';
import { MockDataService } from '../../core/services/mock-data.service';
import { INewsFeed } from '../../core/classes/newsfeed';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subscription } from 'rxjs';
import * as _swal from 'sweetalert';
import { SweetAlert } from 'sweetalert/typings/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { DataService } from '../../data.service';

@Component({
  selector: 'osg-reviews-page',
  templateUrl: './main.component.html'
})

export class ReviewsComponent implements OnInit {
  @Input() applicationUser: ApplicationUser;

  swal: SweetAlert = _swal as any;

  review_content: string;
  rate: number;

  rate_value = [
    'zero', 'worst', 'worse', 'middle', 'good', 'excellent'
  ];

  get reviews() {
    return this.dataService.reviews;
  }
  set reviews(val) {
    this.dataService.reviews = val;
  }

  get first_program() {
    return this.dataService.first_program;
  }
  set first_program(val) {
    this.dataService.first_program = val;
  }

  constructor(private readonly dataService: DataService, private spinner: NgxSpinnerService, private http: HttpClient, lc: NgZone) {
    // window.onscroll = () => {
    //   let status = "not reached";
    //   let windowHeight = "innerHeight" in window ? window.innerHeight
    //     : document.documentElement.offsetHeight;
    //   let body = document.body, html = document.documentElement;
    //   let docHeight = Math.max(body.scrollHeight,
    //     body.offsetHeight, html.clientHeight,
    //     html.scrollHeight, html.offsetHeight);
    //   let windowBottom = windowHeight + window.pageYOffset;
    //   if (windowBottom >= docHeight) {
    //     status = 'bottom reached';
    //   }
    //   lc.run(() => {
    //     if (status == 'bottom reached') {
    //       console.log(status);
    //       this.onShowMore();
    //     }
    //   });
    // };
  }


  ngOnInit() {
    var str = window.location.href.split('?')[1];
    var id = str.split('=')[1];
    this.rate = 0;
    console.log('program_id = ', id);
    this.loadReviews(parseInt(id));
  }

  loadReviews(program_id) {
    this.spinner.show();
    this.http.post('program/restapi?info=read-reviews', {program_id: program_id}, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    })
    .subscribe(resp => {
      console.log('read reviews = ', resp);
      this.reviews = resp['data'];
      this.first_program = resp['program'];
      this.spinner.hide();
    });
  }

  onWriteReview() {
    this.spinner.show();
    this.http.post('program/restapi?info=write-review', {
      score: this.rate,
      content_text: this.review_content,
      program_id: this.first_program['id']
    }, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    })
    .subscribe(resp => {
      this.spinner.hide();
      this.reviews = resp['data'];
    });
  }

}
