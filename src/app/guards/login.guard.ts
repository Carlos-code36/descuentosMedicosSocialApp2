import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

import { AuthService } from '@app/services';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {
  user = undefined;

  constructor(
    private _authService: AuthService,
    private router: Router
  ) { }

  async canActivate() {
    this.user = await this._authService.getLoggedStorage();    
    if (!await this._authService.isLogged()) {
      this.router.navigate(['/auth/login']);
      return false
    }
    return true;
  }
}
