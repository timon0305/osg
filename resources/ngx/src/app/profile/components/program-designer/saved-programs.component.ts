import { Component, OnInit, Input } from '@angular/core';
import { ApplicationUser } from 'src/app/core/classes/user';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DataService } from '../../../data.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'osg-program-designer-saved-programs',
  templateUrl: './saved-programs.component.html'
})
export class ProgramDesignerSavedProgramsComponent implements OnInit{

  publishedPrograms = [];
  showingPrograms = [];
  cur_page = 0;

  @Input() applicationUser: ApplicationUser;

  constructor(private spinner: NgxSpinnerService, private http: HttpClient, private dataService: DataService) {}

  ngOnInit(): void {
    this.http.post('program/restapi?info=get-saved-programs', {}, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    })
    .subscribe(resp => {
      console.log('published programs = ', resp);
      this.publishedPrograms = resp['data'];
      for(var i = 0; i < 5; i ++){
        if(this.publishedPrograms[i]){
          this.showingPrograms.push(this.publishedPrograms[i]);
        } else {
          this.showingPrograms.push([]);
        }
      }
    });
  }

  onPrevPage() {
    if(this.cur_page > 0) {
      this.cur_page--;
      this.showingPrograms = [];
      for(var i=0;i<5;i++){
        if(this.publishedPrograms[i+this.cur_page*5]) {
          this.showingPrograms.push(this.publishedPrograms[i+this.cur_page*5]);
        } else {
          this.showingPrograms.push([]);
        }
      }
    }
  }

  onNextPage() {
    if(this.cur_page < Math.floor((this.publishedPrograms.length-1)/5)) {
      this.cur_page++;
      this.showingPrograms = [];
      for(var i=0;i<5;i++){
        if(this.publishedPrograms[i+this.cur_page*5]) {
          this.showingPrograms.push(this.publishedPrograms[i+this.cur_page*5]);
        } else {
          this.showingPrograms.push([]);
        }
      }
    }
  }
  setProgram(ind) {
    this.dataService.program = this.showingPrograms[ind];
  }
}
