import { FormControl, Validators } from '@angular/forms';
import { Component } from '@angular/core';

import { AuthService } from '@app/services';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recover-password',
  templateUrl: './recover-password.page.html',
  styleUrls: ['./recover-password.page.scss'],
})
export class RecoverPasswordPage {
  recoveryMail = new FormControl('', [Validators.required, Validators.email, Validators.pattern('^[a-zA-Z0-9_.+-]+@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])+\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$')]);
  recoveryPhone = new FormControl('', [Validators.required]);
  numIdentificacion = new FormControl('', [Validators.required]);
  codigoConfirma = new FormControl('', [Validators.required, Validators.pattern('[0-9]*'), Validators.minLength(5), Validators.maxLength(6)]);
  password = new FormControl('', [Validators.required,Validators.minLength(8)]);
  password2 = new FormControl('', [Validators.required,Validators.minLength(5)]);
  passwordTypeInput: string = 'password';
  mostrar: boolean = false;
  tipoValidacion: any;
  idMember: any;

  constructor(
    private _authService: AuthService,
    private router: Router
  ) { }

  async recoverAccount(tipo?) {
    //console.log(tipo);
    
    if (tipo === 'correo') {
      let dato = {
        'tipo': this.tipoValidacion,
        'correo': this.recoveryMail.value,
        'numeroDocumento': '',
        'telefono': ''
      }
      await this._authService.generarCodigo(dato).then(res => {
        this.idMember = res.body;
        console.log(res);
        this.recoveryMail.reset();
      })
      this.mostrar = true;

    }else if (tipo === 'sms') {
      let dato = {
        'tipo': this.tipoValidacion,
        'correo': '',
        'numeroDocumento': this.numIdentificacion.value,
        'telefono': this.recoveryPhone.value
      }
      await this._authService.generarCodigo(dato).then(res => {
        this.idMember = res.body;
        console.log(res);
        this.recoveryPhone.reset();
        this.numIdentificacion.reset();
      })
      this.mostrar = true;
    }else if (tipo === 'wsp') {
      let dato = {
        'tipo': this.tipoValidacion,
        'correo': '',
        'numeroDocumento': this.numIdentificacion.value,
        'telefono': this.recoveryPhone.value
      }
      console.log(dato);
      await this._authService.generarCodigo(dato).then(res => {
        this.idMember = res.body;
        console.log(res);
        this.recoveryPhone.reset();
        this.numIdentificacion.reset();
      })
      this.mostrar = true;
    }else{
      console.log('ERROR');
      this.mostrar = false;
    }
  }

  async togglePassword(elRef) {
    let nativeEl = await elRef.getInputElement();
    nativeEl.type == 'text' ? nativeEl.type = 'password' : nativeEl.type = 'text';

    nativeEl.focus();
  }

  async comprobarCodigo(tipo){
    console.log(this.idMember, this.password2.value, this.codigoConfirma.value, this.tipoValidacion);
    await this._authService.updatePassword(this.idMember, this.password2.value, this.codigoConfirma.value, tipo);
  }

  reset(){
    this.tipoValidacion = undefined;
    this.mostrar = false;
    this.recoveryMail.reset();
    this.recoveryPhone.reset();
    this.numIdentificacion.reset();
  }
}
