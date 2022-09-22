import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { AuthService, UtilitiesService } from '@app/services';
import { IonInput } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  @ViewChild('passwordInput') passwordInput: IonInput;

  loginForm: FormGroup;
  passwordTypeInput: string = 'password';

  constructor(
    private _authService: AuthService,
    private _utilitiesService: UtilitiesService
  ) {
    // console.debug('%c Login page initialized', 'background: #222; color: #bada55');
    this.initializeForm();
  }

  initializeForm() {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email, Validators.pattern('^[a-zA-Z0-9_.+-]+@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$')]),
      pass: new FormControl('', Validators.required)
    });
  }

  async togglePassword() {
    this.passwordTypeInput = this.passwordTypeInput === 'text' ? 'password' : 'text';
    let el = await this.passwordInput.getInputElement();
    const inputSelection = el.selectionStart;
    el.focus();

    setTimeout(() => {
      el.setSelectionRange(inputSelection, inputSelection);
    }, 1000);
  }

  onLogin() {
    let user = this.loginForm.value.email.trim();
    let pass = this._utilitiesService.encrypt(this.loginForm.value.pass);

    if (this.loginForm.valid) this._authService.login(user, pass);
  }
}
