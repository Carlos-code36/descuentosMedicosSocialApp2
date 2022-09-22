import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { Globals } from '@app/globals';
import { AuthService } from '@app/services';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.page.html',
  styleUrls: ['./change-password.page.scss'],
})
export class ChangePasswordPage implements OnInit {
  passwordTypeInput: string = 'password';
  formChangePassword: FormGroup;
  valid: undefined;
  codigo: any;

  constructor(
    private _globals: Globals,
    private _authService: AuthService
  ) { }

  ngOnInit() {
    this.initializeForm();
  }

  initializeForm() {
    this.formChangePassword = new FormGroup({
      lastPassword: new FormControl('', [Validators.required, Validators.minLength(8)]),
      newPassword: new FormControl('', [Validators.required, Validators.minLength(8)]),
      confirmedNewpassword: new FormControl('', [Validators.required, Validators.minLength(8)]),
    });
  }

  async togglePassword(elRef) {
    let nativeEl = await elRef.getInputElement();
    nativeEl.type == 'text' ? nativeEl.type = 'password' : nativeEl.type = 'text';

    nativeEl.focus();
  }

  async sendData(tipo) {
    let contrasena = this.formChangePassword.get('confirmedNewpassword').value;
    let contrasenaAnterior = this.formChangePassword.get('lastPassword').value;
    console.log(tipo);
    

    await this._authService.updatePassword(this._globals.USER_ID, contrasena, contrasenaAnterior, tipo);
  }
}
