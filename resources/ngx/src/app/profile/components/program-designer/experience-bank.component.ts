import { Component, OnInit, Input } from '@angular/core';
import { ApplicationUser } from 'src/app/core/classes/user';
import { DataService } from '../../../data.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'osg-program-designer-experience-bank',
  templateUrl: './experience-bank.component.html'
})
export class ProgramDesignerExperienceBankComponent implements OnInit{

  get first_program() {
    return this.dataService.first_program;
  }
  set first_program(val) {
    this.dataService.first_program = val;
  }
  constructor(private spinner: NgxSpinnerService, private http: HttpClient, private dataService: DataService) {}

  @Input() applicationUser: ApplicationUser;

  ngOnInit(): void {

  }

}
