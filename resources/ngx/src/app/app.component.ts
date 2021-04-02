import { Component } from '@angular/core';
import { ApplicationService } from './core/services/application.service';
import { Router, NavigationStart } from '@angular/router';

@Component({
  selector: 'optimal-strength-gains',
  templateUrl: './app.component.html'
})
export class AppComponent {
  loaded: boolean = false;
  isHeaderFooter: any = true;
  constructor(private readonly applicationService: ApplicationService,
    public router: Router) {}

  async ngOnInit() {
    await this.applicationService.authenticatedUser.toPromise();
    this.loaded = true;
    if (window.location.href.indexOf('workout-detail') !== -1) {
      this.isHeaderFooter = false;
    }
    this.router.events.subscribe(event => {
      if(event instanceof NavigationStart) {
        this.isHeaderFooter = true;
        if (event.url.indexOf('workout-detail') !== -1) {
          this.isHeaderFooter = false;
        }
      }
    });
  }

  onActivate(event) {
    window.scroll(0, 0);
  }
}
