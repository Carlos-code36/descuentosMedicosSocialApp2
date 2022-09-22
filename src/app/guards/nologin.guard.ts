import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

import { AuthService } from '@app/services';

@Injectable({
  providedIn: 'root'
})
export class NologinGuard implements CanActivate {
  user: any;

  constructor(
    private router: Router,
    private _authService: AuthService
  ) { }

  async canActivate() {
    if (await this._authService.isLogged()) {
      this.router.navigate(['/home']);
      return false
    }

    return true;
  }
}