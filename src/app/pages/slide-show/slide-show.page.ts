import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService, SessionStorageService } from '@app/services';

@Component({
  selector: 'app-slide-show',
  templateUrl: './slide-show.page.html',
  styleUrls: ['./slide-show.page.scss'],
})
export class SlideShowPage implements OnInit {

  constructor(
    private router: Router,
    private _authService: AuthService,
    private _storageService: SessionStorageService,
  ) { }

  async ngOnInit() {
    let show = await this._storageService.get('slidershow');
    let user = await this._authService.isLogged();

    if (user) {
      this.router.navigate(['home'])
    };
    
    if (!user && show == false) {
      this.router.navigate(['/auth/login'])
    };
  }

  disableSlideShow(slider_check) {
    this._storageService.set('slidershow', !slider_check.checked);
  }
}
