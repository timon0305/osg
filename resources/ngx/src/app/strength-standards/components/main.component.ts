import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'osg-strength-standards',
  templateUrl: './main.component.html'
})
export class StrengthStandardsComponent implements OnInit{
  status: string = 'strength';
  public isShow:boolean=false;
  public link_name:any='Read More';
  constructor(){}

  ngOnInit(): void {
    
  }

  toggle(){    
    this.isShow=!this.isShow;
    if(this.isShow){
      this.link_name="Read Less";
    }    
    else{
      this.link_name="Read More";
    }
  }

}
