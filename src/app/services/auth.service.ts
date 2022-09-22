import { ModalValidateAccountComponent } from './../components/modal-validate-account/modal-validate-account.component';
import { ModalController } from '@ionic/angular';
import { Injectable, Injector } from "@angular/core";
import { Router } from "@angular/router";
import { Globals } from "@app/globals";

import { SessionStorageService } from './session-storage.service'
import { UtilitiesService } from "./utilities.service";
import { DynamicClient } from "./dynamicClient";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(
    private _storageService: SessionStorageService,
    private _utilitiesService: UtilitiesService,
    private _dynamicClient: DynamicClient,
    private injector: Injector,
    private _globals: Globals,
    private router: Router,
  ) { }

  public get modalController(): ModalController {
    return this.injector.get(ModalController);
  }

  public async isLogged(): Promise<boolean> {
    return !!(await this._storageService.get('user'));
  }

  public async logout(kill?: boolean) {
    if (kill) {
      this.cleanData();
      return;
    }
    let confirm = await this._utilitiesService.showConfirmDialog('Cerrar sesión', '¿Esta seguro que desea cerrar la sesión?');
    confirm && this.cleanData();
  }

  /**
   * Método para realizar login de usuario
   * @param username correo de usuario
   * @param password contraseña de usuario
   * @returns promesa del metodo
   */
  public async login(username: string, password: string) {
    let dataLogin = { usuario: username, contrasena: password };
    let auth = await this._dynamicClient.postRequest('/login', dataLogin).toPromise();
    //console.log(auth);
    

    if (auth.body.tipoCuenta == 'empresa') {
      this._utilitiesService.showInfoDialog('Cuenta empresa', 'Recuerda que tu cuenta de empresa es un perfil administrativo y debes ingresar desde la pagina web http://citas.prevenirexpress.com');
      return
    }

    if (auth.body.activa == 2) {
      console.log('cuenta inactiva');
      let confirm = await this._utilitiesService.showConfirmDialog('Cuenta inactiva', 'Tu cuenta se encuentra inactiva. ¿Deseas reactivarla?', 'reactivar', 'cancelar');

      this.resendEmailCodeValidation(auth.body)
      const modal = await this.modalController.create({
        component: ModalValidateAccountComponent,
        componentProps: { typeValidation: 'correo', title: 'Email', member: auth.body, inactiveAccount: true },
        cssClass: 'modal__validate'
      })

      modal.present()
      return;
    }

    if (auth) {
      this._globals.USER_OBJECT = auth.body;
      this._globals.USER_TOKEN = auth.token;
      this._globals.USER_MENU = [...auth.menu].find(e => e.plataforma == 'APP_MOVIL').menu

      await this.setPushNotificationsId();

      let goTo = ['/home'];

      !auth.body.correoConfirmado && goTo.push('/validate-account/email');
      !auth.body.validada && goTo.push('/update-profile');
      // !rs.body.telefonoConfirmado && goTo.push('/validate-account/phone');

      setTimeout(() => this.router.navigate([goTo[0]]), 500);
    }
  }

  async closeAccount() {
    let confirm = await this._utilitiesService.showConfirmDialog('Cancelar cuenta', '¿Estas seguro que deseas cancelar tu cuenta? Esto cerrará tu sesión y cancelará tus citas activas inmediatamente. Para reactivar tu cuenta nuevamente inicia sesión con tus credenciales y sigue el proceso de reactivación. Te esperamos muy pronto!');

    if (confirm) {
      let rs = await this._dynamicClient.putRequest(`/darsedebaja/${this._globals.USER_ID}`).toPromise();
      rs?.ok && this.logout(true);
    }
  }

  public async register(data) {
    let welcomeTitle = 'Bienvenido';
    let welcomeMessage = 'Su cuenta fué registrada exitosamente, se ha enviado al correo registrado un código para realizar la activación de la cuenta.';
    let register = await this._dynamicClient.postRequest('/registro', data).toPromise();

    if (register) {
      this._globals.USER_OBJECT = register.body;
      this._globals.USER_TOKEN = register.token;

      await this.setPushNotificationsId();

      // this._utilitiesService.showInfoDialog(welcomeTitle, welcomeMessage)
      // this.router.navigate(['/validate-account/email']);

      return true;
    }

    return false;
  }

  public async verifyEmail(email: string) {
    let temp = await this._dynamicClient.getRequest(`/verificar/${email}`).toPromise();
    return temp.existe;
  }

  public async verifyIdentificacion(identificacion){
    console.log('identificacion:     ',identificacion);
    let temp = await this._dynamicClient.getRequest(`/identificacion/${identificacion}`).toPromise();
    console.log('temp de consulta de identificacion ',temp);
    return temp.existe;
  }

  public async verifyDocument(documentId: string) {
    let temp = await this._dynamicClient.getRequest(`/member/${documentId}`).toPromise();
    return temp.existe;
  }

  public async recoverAccount(email: string) {
    try {
      let res = await this._dynamicClient.getRequest(`/confirmacCorreo/${email}`).toPromise();
      this._utilitiesService.showInfoDialog('Información', res.mensaje);
      return res;      
    } catch (error) {
      console.log(error);
    }
  }

  public async generarCodigo(data){
    console.log(data);
    try {
      let res = await this._dynamicClient.postRequest('/confirmardatos', data).toPromise();
      this._utilitiesService.showInfoDialog('Información', res.mensaje);
      return res;      
    } catch (error) {
      console.log(error);
    }
  }

  /**
   * Método para actualizar la contraseña de la cuenta de usuario.
   * @param idMembers Identificador usuario
   * @param contrasena Contraseña nueva.
   * @param contrasenaAnterior Contraseña anterior.
   */
  public async updatePassword(idMembers, newPassword, codigo, tipo) {
    let data
    if (tipo === 'codigo') {
      data = {
        idMembers: idMembers,
        contrasena: this._utilitiesService.encrypt(newPassword),
        contrasenaAnterior: codigo,
        tipo: tipo  
      }
    }
    if (tipo === 'contrasena') {
      data = {
        idMembers: idMembers,
        contrasena: this._utilitiesService.encrypt(newPassword),
        contrasenaAnterior: this._utilitiesService.encrypt(codigo),
        tipo: tipo
      }
    }

    console.log(data);

    let upd = await this._dynamicClient.postRequest('/cambiarcontrasena', data).toPromise();

    if (upd) {
      this._utilitiesService.showInfoDialog(`Información`, upd.mensaje);
      this.logout(true);
      this.router.navigate(['/auth/login']);
    }
  }

  public async setPushNotificationsId() {
    let pushNotificationData = {
      idNotificacionPush: this._globals.PUSHNOTIFICATIONSID,
      idMembers: this._globals.USER_ID
    }

    await this._dynamicClient.postRequest('/idpush', pushNotificationData).toPromise();
  }

  public async resendEmailCodeValidation(member: any) {
    let resend = await this._dynamicClient.getRequest(`/reenviarcodigo/${member.idMembers}`).toPromise();
    resend && this._utilitiesService.showInfoDialog('Información', `Código de confirmación enviado con éxito al correo ${member.correo}.`);
  }

  public async sendPhoneCodeValidation(data: any | {}) {
    let sendCodeToPhone = await this._dynamicClient.postRequest('/enviarsmsconfirmacion/', data).toPromise();
    sendCodeToPhone && this._utilitiesService.showInfoDialog('Información', `Código de confirmación enviado con éxito al celular ${data.numero}.`);
  }

  public async sendWhatsappCodeValidation(data: any | {}) {
    console.log(data);
    
    let sendCodeToPhone = await this._dynamicClient.postRequest('/enviarwspconfirmacion/', data).toPromise();
    sendCodeToPhone && this._utilitiesService.showInfoDialog('Información', `Código de confirmación enviado con éxito a su whatsapp ${data.numero}.`);
  }

  public async reactivateAccount(dataAccount) {
    let validate = await this._dynamicClient.postRequest('/confirmarcuenta', dataAccount).toPromise();

    if (!validate.ok) return
    
    this._utilitiesService.showInfoDialog(`Bienvenido`, 'Bienvenido, su cuenta fué validada exitosamente. Por favor vuelva a iniciar sesión.');
    this.logout()
    this.router.navigate(['/auth/login']);
  }

  public async validateAccount(validateData: any) {
    let msgDialog = { title: '', description: '' }
    let user = this._globals.USER_OBJECT;

    let validate = await this._dynamicClient.postRequest('/confirmarcuenta', validateData).toPromise();

    if (!validate.ok) return

    if (user.validada) {
      msgDialog.description = `Se ha realizado exitosamente la validación de su ${validateData.opcion}`
      msgDialog.title = 'Completo'
    } else {
      msgDialog.description = 'Su cuenta fué validada exitosamente. Bienvenido.'
      msgDialog.title = `Bienvenido`
    }

    this._utilitiesService.showInfoDialog(msgDialog.title, msgDialog.description);

    user['telefonoConfirmado'] = ~~(validateData.opcion == 'telefono');
    user['correoConfirmado'] = ~~(validateData.opcion == 'correo');

    this._globals.USER_OBJECT = user;
    this.router.navigate(['/home/publications']);  
  }

  public cleanData() {
    this._utilitiesService.showLoader();
    console.log('clean data');

    this._storageService.remove('tkn');
    this._storageService.remove('user');
    this._storageService.remove('menu');
    this._storageService.remove('userid');
    this._storageService.remove('usertype');
    this._storageService.remove('usermail');
    this._storageService.remove('usertel');
    this._storageService.remove('username');
    this._storageService.remove('group');
    this._storageService.remove('beneficiaries');

    // this._storageService.cleanAll();

    setTimeout(() => {
      this._utilitiesService.closeLoader();
      this.router.navigate(['/auth/login']);
    }, 1000);
  }

  public async getLoggedStorage() {
    return await this._storageService.get('user')
  }
}