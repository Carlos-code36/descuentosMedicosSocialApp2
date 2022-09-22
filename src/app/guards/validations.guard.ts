import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { ModalValidateAccountComponent } from '@app/components/modal-validate-account/modal-validate-account.component';
import { Globals } from '@app/globals';

import { AuthService } from '@app/services';
import { ModalController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ValidationsGuard implements CanActivate {
  user: any;

  constructor(
    private modalController: ModalController,
    private _authService: AuthService,
    private router: Router,
  ) { }

  async canActivate() {
    this.user = await this._authService.getLoggedStorage();

    if (!this.user) {
      this.router.navigate(['/auth/login']);
      return false;
    } else {
      if (this.user['correoConfirmado'] == 0 && this.user['telefonoConfirmado'] == 0) {
        // this.router.navigate(['/validate-account/email']);
        this.validateMail()
        return false;
      }

      if (this.user['validada'] == 0) {
        console.log('validada');

        this.router.navigate(['/update-profile']);
        return false;
      }

    }

    return true;
  }

  async validateMail() {
    console.log('modal validate mail');
    const modal = await this.modalController.create({
      component: ModalValidateAccountComponent,
      componentProps: { typeValidation: 'correo', title: 'Email', member: this.user, newAccount: true },
      cssClass: 'modal__validate'
    })

    modal.present()
  }

}
