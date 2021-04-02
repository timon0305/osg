import { Component, OnInit, Input, HostBinding } from '@angular/core';
import { ApplicationUser } from 'src/app/core/classes/user';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'osg-get-started',
  templateUrl: './get-started.component.html'
})
export class GetStartedComponent implements OnInit {

  @HostBinding('class') css: string = 'primary';

  @Input() set view(v: string) {
    // supports: primary, secondary, tertiary
    this.css = v ? v : 'primary';
  }

  @Input() sections: string[];

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
  }

}
