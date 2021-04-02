import { Component, OnInit, Input } from '@angular/core';
import { ApplicationUser } from 'src/app/core/classes/user';
import { OwlOptions } from 'ngx-owl-carousel-o';

export class Review {
  rate: number;
  name: string;
  description: string;
}

@Component({
  selector: 'osg-personal-trainer-experience-bank',
  templateUrl: './experience-bank.component.html'
})
export class PersonalTrainerExperienceBankComponent implements OnInit{
  
  @Input() applicationUser: ApplicationUser;
  reviews: Array<Review> = new Array();
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
  width: string;

  ngOnInit(): void {
    this.width = window.innerWidth.toString();
    this.reviews = [
      {rate: 5, name: "Alex James", description: "Best coach I have worked with!"},
      {rate: 4, name: "Clara Smith", description: "Passion and dedication! Recommended!"},
      {rate: 3, name: "James Bond", description: "Passion and dedication! Recommended!"},
      {rate: 2, name: "Json Kidd", description: "Best coach I have worked with!"},
      {rate: 3, name: "Leboron James", description: "Passion and dedication! Recommended!"},
      {rate: 4, name: "Alex Sanchez", description: "Passion and dedication! Recommended!"},
      {rate: 5, name: "Lionel Messi", description: "Best coach I have worked with!"},
      {rate: 3, name: "Iker Casilas", description: "Passion and dedication! Recommended!"},
      {rate: 5, name: "Marco Asensio", description: "Passion and dedication! Recommended!"}
    ];
  }

}
