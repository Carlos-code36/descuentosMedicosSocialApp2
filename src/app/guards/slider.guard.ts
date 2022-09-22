import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

import { AuthService, SessionStorageService } from '@app/services';

@Injectable({
  providedIn: 'root'
})
export class SliderGuard implements CanActivate {
  user: any;

  constructor(
    private router: Router,
    private _authService: AuthService,
    private _storageService: SessionStorageService
  ) { }

  async canActivate() {
    if (await this._storageService.get('slidershow') == false) {
      this.router.navigate(['/auth/login']);
      return false;
    }

    if (await this._authService.isLogged()) {
      this.router.navigate(['/home']);
      return false;
    }

    return true;
  }
}
