import { Component, EventEmitter } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { DataService } from '../../../../data.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'osg-program-designer-write-review-modal',
  templateUrl: './write-review-modal.component.html',
})

export class ProgramDesignerWriteReviewModalComponent {

  review_content: string;
  rate: number;

  rate_value = [
    'zero', 'worst', 'worse', 'middle', 'good', 'excellent'
  ];

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

  onClose: EventEmitter<any> = new EventEmitter();
  onComplete: EventEmitter<any> = new EventEmitter();

  constructor(
    private readonly bsModalRef: BsModalRef,
    private dataService: DataService,
    private spinner: NgxSpinnerService,
    private http: HttpClient
  ) { }
  async ngOnInit() {
    this.rate = 0;
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

    this.onClose.emit(null);
    this.bsModalRef.hide();
  }

  close(): void {
    this.onClose.emit(null);
    this.bsModalRef.hide();
  }

}
