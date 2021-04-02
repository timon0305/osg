import { Component, OnInit, Input } from '@angular/core';
import { ApplicationUser } from 'src/app/core/classes/user';
import { OwlOptions } from 'ngx-owl-carousel-o';

export class Offer {
  src: string;
  title: string;
  time: number;
  cost: number;
}

@Component({
  selector: 'osg-personal-trainer-offers',
  templateUrl: './offers.component.html'
})
export class PersonalTrainerOffersComponent implements OnInit{
  
  @Input() applicationUser: ApplicationUser;
  offers: Array<Offer> = new Array();
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
    this.offers = [
      {src: '/assets/images/logo.png', title: 'pt basic', time: 5, cost: 2500},
      {src: '/assets/images/logo.png', title: 'pt Premium', time: 10, cost: 4700},
      {src: '/assets/images/logo.png', title: 'pt pro', time: 15, cost: 6750},
      {src: '/assets/images/logo.png', title: 'pt Business', time: 20, cost: 8600}
    ];
  }

}
