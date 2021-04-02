import { Component, OnInit, Input } from '@angular/core';
import { ApplicationUser } from 'src/app/core/classes/user';

@Component({
  selector: 'osg-personal-trainer',
  templateUrl: './personal-trainer.component.html'
})
export class PersonalTrainerComponent implements OnInit{
  
  @Input() applicationUser: ApplicationUser;

  getStartedSections: string[] = ["calendar builder guide", "progression model guide", "about auto-regulation"];
  current_set: string = 'profile';

  ngOnInit(): void {
  }

  NextPage() {
    this.current_set = "graph";
    window.scrollTo(0, 200);
  }

  PreviousPage() {
    this.current_set = "profile";
    window.scrollTo(0, 200);
  }
}
