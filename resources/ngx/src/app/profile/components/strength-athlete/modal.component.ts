import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SimpleModalComponent } from 'ngx-simple-modal';

export interface Model {
  date: string;
  status: string;
  detail: string;
  type: string;
}

@Component({
  selector: 'osg-strength-athlete-modal',
  template: `
    <div class="modal-content {{status}}">
      <div class="modal-header">
        <h4>{{date}}</h4>
      </div>
      <div class="modal-body">
        <p class="detail">{{detail}}</p>
        <p>{{type}}</p>
      </div>
      <div class="modal-footer">
        <p class="status text-capitalize">
          <svg *ngIf="status == 'completed'" aria-hidden="true" focusable="false" data-prefix="far" data-icon="check-square" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" class="check svg-inline--fa fa-check-square fa-w-14 fa-lg"><path fill="currentColor" d="M400 32H48C21.49 32 0 53.49 0 80v352c0 26.51 21.49 48 48 48h352c26.51 0 48-21.49 48-48V80c0-26.51-21.49-48-48-48zm0 400H48V80h352v352zm-35.864-241.724L191.547 361.48c-4.705 4.667-12.303 4.637-16.97-.068l-90.781-91.516c-4.667-4.705-4.637-12.303.069-16.971l22.719-22.536c4.705-4.667 12.303-4.637 16.97.069l59.792 60.277 141.352-140.216c4.705-4.667 12.303-4.637 16.97.068l22.536 22.718c4.667 4.706 4.637 12.304-.068 16.971z" class=""></path></svg>
          <svg *ngIf="status !='completed'"><circle cx="5" cy="5" r="1" stroke="#a0a0a0" stroke-width="3" /></svg>
          {{status}}
        </p>
        <button type="button" class="btn" (click)="showDetail(date, status)"><img src="assets/images/icons/eye.png"></button>
      </div>
    </div>
  `,
  styles: [
    '.modal-content {max-width: 250px; top: 250px !important; padding: 10px 20px !important; border: 3px solid; border-radius: 10px;}',
    '.modal-content.upcoming {border-color: #128cf3; background: #e2f2ff;}',
    '.modal-content.completed {border-color: #76cf16; background: #f0ffdf;}',
    '.modal-content.missed {border-color: #ff7200; background: #ffecdd;}',
    '.modal-content.today {border-color: #bcbcbc; background: #fff;}',
    '.modal-content .modal-header {border: none; padding: 0; height: 35px;}',
    '.modal-content .modal-header h4 {font-family:Gotham Medium; font-size: 17px; color: #000; margin:0}',
    '.modal-content .modal-body {padding: 10px 0px;}',
    '.modal-content .modal-body p {margin: 0;}',
    '.modal-content .modal-body p.detail {color: #e6aa28; font-family: Gotham Medium; font-size: 20px;}',
    '.modal-content .modal-footer {justify-content: flex-start; border: none; padding: 0;}',
    '.modal-content .modal-footer p {margin-right: 20px; align-self: flex-end;}',
    '.modal-content .modal-footer p svg {width: 10px; height: 10px}',
    '.modal-content .modal-footer p svg.check {width: 20px; height: 18px}',
    '.modal-content .modal-footer button {background: #fff; border: 1px solid #666; padding: 10px;}'
  ]
})
export class StrengthAthleteModalComponent extends SimpleModalComponent<Model, null> implements Model {
  date: string;
  status: string;
  detail: string;
  type: string;

  constructor(private router: Router) {
    super();
  }

  showDetail(date: string, status: string) {
    this.close();
    this.router.navigate(['/workout-detail', date, status]); 
  }

}