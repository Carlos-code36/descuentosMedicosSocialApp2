import { Component } from '@angular/core';
import { MenuController, ModalController, NavParams } from '@ionic/angular';

import { UserService } from '@app/services/user.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Globals } from '@app/globals';
import { AuthService } from '@app/services';

@Component({
  selector: 'app-modal-validate-account',
  templateUrl: './modal-validate-account.component.html',
  styleUrls: ['./modal-validate-account.component.scss'],
})
export class ModalValidateAccountComponent {
  formValidation: FormGroup;

  typeValidation: Object;
  inactiveAccount: any;
  message: string;
  title: string;
  member: any;
  newAccount;

  constructor(
    private modalController: ModalController,
    private _authService: AuthService,
    private navParams: NavParams,
    public _globals: Globals,
  ) {
    this.inactiveAccount = this.navParams.get('inactiveAccount');
    this.typeValidation = this.navParams.get('typeValidation');
    this.newAccount = this.navParams.get('newAccount');
    this.member = this.navParams.get('member');
    this.title = this.navParams.get('title');

    if (this.newAccount) {
      this.title = 'Bienvenido';
      this.message = 'Su cuenta fué registrada exitosamente, se ha enviado al correo registrado un código para realizar la activación de la cuenta. Revisa tu bandeja de entrada o tu bandeja de spam o correo no deseado e ingresa el código';
    } else if (this.inactiveAccount) {
      this.title = 'Bienvenido';
      this.message = 'Se ha enviado al correo registrado un código para realizar la reactivación de la cuenta. Revisa tu bandeja de entrada o tu bandeja de spam o correo no deseado e ingresa el código';
    } else {
      this.title = `Validación de ${this.title}`
      this.message = this.typeValidation == 'correo' ? `Ingresa el código de verificación enviado a <strong>${this.member.correo}</strong>` : `Se ha enviado un sms para la validación al celular ${this.member.telefono}`
    }
  }

  ngOnInit() {
    this.formValidation = new FormGroup({
      validationCode: new FormControl('', [Validators.required, Validators.minLength(5), ,Validators.pattern('[0-9]*')])
    });
  }

  /**
   * Método para reenviar código de verificación
   * @param typeValidation Tipo de
   */
  async resendCode(type?) {
    if (type) this.typeValidation = type;
    this.typeValidation == 'correo' && await this._authService.resendEmailCodeValidation(this.member);
    this.typeValidation == 'telefono' && await this._authService.sendPhoneCodeValidation({ idMembers: this.member?.idMembers, numero: this.member?.telefono });
    this.typeValidation == 'whatsapp' && await this._authService.sendWhatsappCodeValidation({ idMembers: this.member?.idMembers, numero: this.member?.telefono });
  }

  async confirm() {
    console.log('confirm');
    let data = {
      codigo: this.formValidation.value.validationCode,
      idMembers: this.member.idMembers,
      opcion: this.typeValidation
    }

    console.log(data);
    

    this.inactiveAccount && this._authService.reactivateAccount(data).then(() => {
      this.closeModal();
    })

    !this.inactiveAccount && this._authService.validateAccount(data).then(() => {
      this.closeModal();
    })
  }

  closeModal() {
    this.modalController.dismiss();
  }
}
