import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AlertController, ModalController } from '@ionic/angular';


import { ModalTermsComponent } from '@components/modal-terms/modal-terms.component';
import { AditionalDataPage } from './../aditional-data/aditional-data.page';
import { AuthService, UtilitiesService } from '@app/services';

import { validatorEMailExist, validatorPasswords } from '@app/app.validators';
import { ModalVerifyDataComponent } from '@app/components/modal-verify-data/modal-verify-data.component';
import { ModalValidateAccountComponent } from '@app/components/modal-validate-account/modal-validate-account.component';
import { Globals } from '@app/globals';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage {
  @ViewChild('passwordInput') passwordInput;
  @ViewChild('passwordInputConfirm') passwordInputConfirm: ElementRef;

  registerForm: FormGroup;
  passwordTypeInput: string = 'password';
  passwordTypeInputConfirm: string = 'password';

  emailRegistred = undefined;
  identificacionRegistred = undefined;

  dataRegister: any = undefined;
  vista = 'type';
  doc = false;
  filteredRethusList: Array<any> = undefined;

  constructor(
    private _globals: Globals,
    private _authService: AuthService,
    private alertController: AlertController,
    private modalController: ModalController,
    private _utilitiesService: UtilitiesService,
  ) {
    console.debug('%c Register page initialized', 'background: #222; color: #bada55');
    // this.initializeForm()
  }

  initializeForm() {
    if (this.vista == 'form' && this.doc == false) {
      this.registerForm = new FormGroup({
        nombres: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(30), Validators.pattern('[a-z A-z äáàëéèíìöóòúùñçñÑ]*')]),
        apellidos: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(30), Validators.pattern('[a-z A-z äáàëéèíìöóòúùñçñÑ]*')]),
        telefono: new FormControl('', [Validators.required, Validators.minLength(10), Validators.pattern('[0-9]*')]),
        email: new FormControl('', [Validators.required, Validators.email, validatorEMailExist]),
        password: new FormControl('', [Validators.required, Validators.minLength(8)]),
        passwordConfirm: new FormControl('', [Validators.required, Validators.minLength(8), validatorPasswords]),
        profetional: new FormControl(false),
        identificacion: new FormControl('', [Validators.required, Validators.minLength(7),Validators.pattern('[0-9]*')])
      });
    }
    if (this.vista == 'form' && this.doc == true) {
      this.registerForm = new FormGroup({
        nombres: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(30), Validators.pattern('[a-z A-z äáàëéèíìöóòúùñçñÑ]*')]),
        apellidos: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(30), Validators.pattern('[a-z A-z äáàëéèíìöóòúùñçñÑ]*')]),
        telefono: new FormControl('', [Validators.required, Validators.minLength(10), Validators.pattern('[0-9]*')]),
        email: new FormControl('', [Validators.required, Validators.email, validatorEMailExist]),
        password: new FormControl('', [Validators.required, Validators.minLength(8)]),
        passwordConfirm: new FormControl('', [Validators.required, Validators.minLength(8), validatorPasswords]),
        profetional: new FormControl(false),
        identificacion: new FormControl('', [Validators.required, Validators.minLength(7),Validators.pattern('[0-9]*')]),
        profetionalCard: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(10), Validators.pattern('[0-9]*')]),
        rethusDataName: new FormControl('', [Validators.required]),
        rethus: new FormControl('', [Validators.required])
      });
    }
    console.log('registerForm', this.registerForm.value);
  }

  async validateRegister() {
    this.dataRegister = {
      nombres: this.registerForm.value.nombres,
      apellidos: this.registerForm.value.apellidos,
      correo: this.registerForm.value.email,
      contrasena: this._utilitiesService.encrypt(this.registerForm.value.password),
      telefono: this.registerForm.value.telefono,
      avatar: 'avatarundefined.png',
      tipoCuenta: 'usuario',
      idtipoDocumentos: 7,
      numeroDocumentoUser: this.registerForm.value.identificacion,
    }

    console.log('primera', this.registerForm.value);
    this.showModalisDoctor();
  }

  async showModalisDoctor() {
    // let modal = await this.modalController.create({
    //   component: AditionalDataPage,
    //   cssClass: 'modal__data',
    //   backdropDismiss: false,
    //   swipeToClose: false,
    //   componentProps: {
    //     selectorType: 'doctorSelector'
    //   }
    // })
    // modal.onDidDismiss().then(({ data }) => {
    //   data == 'user' && this.showModalTerms()
    //   data == 'doctor' && this.showModalAditionalInfo()
    // });

    // modal.present();
    if (this.vista == 'form' && this.doc == false) {
      this.showModalTerms();
    }
    else if (this.vista == 'form' && this.doc == true) {
      this.showModalAditionalInfo();
    }
  }

  async showModalAditionalInfo() {
    // let modal = await this.modalController.create({
    //   component: AditionalDataPage,
    //   cssClass: 'modal__data',
    //   backdropDismiss: false,
    //   swipeToClose: false,
    //   componentProps: {
    //     member: 1
    //   }
    // })
    // modal.onDidDismiss().then(({ data }) => {
    //   this.dataRegister.tipoCuenta = 'medico';
    //   this.dataRegister.idEspecialidad = data.idEspecialidad;
    //   this.dataRegister.tarjetaProfecional = data.tarjetaProfecional;
    //   this.dataRegister.idmunicipio = 1;
    //   this.dataRegister.app = true;

    //   this.showModalTerms();
    // });

    // modal.present();
    this.dataRegister.tipoCuenta = 'medico';
    this.dataRegister.idEspecialidad = this.registerForm.value.rethus
    this.dataRegister.tarjetaProfecional = this.registerForm.value.profetionalCard
    this.dataRegister.idmunicipio = 1;
    this.dataRegister.app = true;
    this.showModalTerms();
  }

  /**
   * Método para mostrar modal con los terminos y condiciones
   */
  async showModalTerms() {
    const modal = await this.modalController.create({
      component: ModalTermsComponent,
      cssClass: 'modal__terms',
      swipeToClose: true
    })

    modal.onDidDismiss().then(res => {
      const { data } = res
      // if (data['selected']) this.registerUser()
      this.showModalVerifydata()
    });

    modal.present();
  }

  /**
   * Método para mostrar modal de verificación de datos
   */
  async showModalVerifydata() {
    const modal = await this.modalController.create({
      component: ModalVerifyDataComponent,
      cssClass: 'modal__verify',
      swipeToClose: false,
      componentProps: {
        dataRegister: this.dataRegister
      }
    })

    modal.onDidDismiss().then(res => {
      const { data } = res
      console.log('data',data)
      data && this.registerUser()
    });

    modal.present();
  }

  async registerUser() {
    let rs = await this._authService.register(this.dataRegister)
    if (rs) {
      this.registerForm.reset();
      this.validateMail()
    }
    // let welcomeTitle = 'Bienvenido';
    // let welcomeMessage = 'Su cuenta fué registrada exitosamente, se ha enviado al correo registrado un código para realizar la activación de la cuenta.';
  }

  async validateMail() {
    const modal = await this.modalController.create({
      component: ModalValidateAccountComponent,
      componentProps: { typeValidation: 'correo', title: 'Email', member: this._globals.USER_OBJECT, newAccount: true },
      cssClass: 'modal__validate'
    })

    modal.present()
  }

  async showModalAditionalInfo2() {
    let alert = await this.alertController.create({
      cssClass: ['custom__alert', 'alert__input'],
      header: 'Datos adicionales',
      message: 'Como profesional de la salud, necesitamos que nos brindes algunos datos adicionales necesarios para continuar, agradecemos su colaboración.',
      inputs: [
        {
          name: 'profetional_card',
          placeholder: 'Tarjeta profesional'
        },
        {
          name: 'studies',
          placeholder: 'Estudios'
        },
        {
          name: 'spetialitation',
          placeholder: 'Especialización'
        }
      ],
      buttons: [
        {
          text: 'Aceptar',
          role: 'confirm',
          handler: (data) => data
        },
        {
          text: 'Cancelar',
          role: 'cancel'
        }
      ]
    });

    alert.onDidDismiss().then(rs => {
      console.log(rs.data.values);
    })

    alert.present();
  }

  togglePassword(type?) {
    if(type =='confirm')
    {
      console.log('funciond e confirmacion')
      this.passwordTypeInputConfirm= this.passwordTypeInputConfirm==='text' ?'password':'text';
      // this.passwordInputConfirm.el.focus({ preventScroll: false})
    }
    else{
      this.passwordTypeInput = this.passwordTypeInput === 'text' ? 'password' : 'text';
      this.passwordInput.el.focus({ preventScroll: false });
    }
   
  }

  async verifyEmail(target) {
    this.emailRegistred = undefined;
    let formEmail = this.registerForm.get('email');

    if (formEmail.valid) {
      this._utilitiesService.showLoaderInput(target.parentElement.lastElementChild.querySelector('.loading__input'));

      let rs = await this._authService.verifyEmail(this.registerForm.value.email);

      setTimeout(() => {
        this.emailRegistred = rs;
        rs != undefined && this._utilitiesService.hideLoaderInput(target.parentElement.lastElementChild.querySelector('.loading__input'));
      }, 1000);
    }
  }

  async verifyIdentificacion(target) {
    this.identificacionRegistred = undefined;
    let formIdentificacion = this.registerForm.get('identificacion');
    console.log('formIdentificacion', formIdentificacion);
    if (formIdentificacion.valid) {
      this._utilitiesService.showLoaderInput(target.parentElement.lastElementChild.querySelector('.loading__input'));
      let rs = await this._authService.verifyIdentificacion(this.registerForm.value.identificacion);
      console.log('respuesta de verificar identificaicon ', rs);

      setTimeout(() => {
        this.identificacionRegistred = rs;
        rs != undefined && this._utilitiesService.hideLoaderInput(target.parentElement.lastElementChild.querySelector('.loading__input'));
      }, 1000);
    }
  }

  comparePassword() {
    // console.log(this.passwordInput, this.passwordInputConfirm);
  }
  form() {
    this.vista = 'form';
    this.initializeForm()

  }
  form1() {
    this.vista = 'form';
    this.doc = true;
    this.initializeForm()

  }
  ////////////titulo rethus//////////////////////

  focusDropdownSearch(el: HTMLInputElement) {
    this.registerForm.controls.rethusDataName.setValue('');
    this.searchRethus(el);
  }

  blurDropdownSearch() {
    let rethusId = this.registerForm.value.rethus;
    setTimeout(() => {
      this.filteredRethusList = undefined;
      if (rethusId == '') return;
      this.registerForm.controls.rethusDataName.setValue(this.getNameRethusById(rethusId));
    }, 150);
  }

  searchRethus(event: HTMLInputElement) {
    this.filteredRethusList = this._globals.SPECIALITIES.filter(el => {
      let name = el.nombreEspecialidad.toLowerCase();
      if (name.includes(event.value)) return true;
    })
  }

  selectRethusItem(target: HTMLElement) {
    console.log('selectRethusItem', target);
    let selRethusData = target.getAttribute('data-rethus-id');
    console.log('selRethusData', selRethusData);
    this.registerForm.controls.rethus.setValue(selRethusData);
    this.blurDropdownSearch();
  }

  getNameRethusById(rethusId: number) {
    let speciality = this._globals.SPECIALITIES.find(dt => dt.idEspecialidad == rethusId);
    return speciality.nombreEspecialidad.split('-')[1];
  }

  vistaType(){
    this.vista='type';
    this.doc= false;
  }
}