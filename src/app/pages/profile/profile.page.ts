import { Platform, NavController, ModalController } from '@ionic/angular';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DatePicker } from '@ionic-native/date-picker/ngx';
import { Component, OnInit } from '@angular/core';

import { Globals } from '@app/globals';
import { AuthService, UserService, UtilitiesService } from '@app/services';
import { ModalValidateAccountComponent } from '@app/components/modal-validate-account/modal-validate-account.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  departmentsAndTowns: Array<any>;
  documentTypes: [];

  documentRegistered = undefined;
  userType: string = undefined;
  formDataUser: FormGroup;
  isAdult: boolean;
  member: any;

  avatarFile: string;
  coverpageFile: string;

  constructor(
    public _globals: Globals,
    private navCtrl: NavController,
    private datePicker: DatePicker,
    private _userService: UserService,
    private _authService: AuthService,
    private modalController: ModalController,
    private _utilitiesService: UtilitiesService
  ) { }

  async ngOnInit() {
    this.member = await this._authService.getLoggedStorage();

    if (this.member) {
      console.log(this.member);
      this.userType = this.member['tipoCuenta'];

      this.inicializeForm();
      this.member['validada'] == 0 && this._utilitiesService.showInfoDialog('Validación requerida', 'Para el uso de la aplicación es necesario que complete sus datos a continuación.');
    }
  }

  inicializeForm() {
    let dateTemp = this.member['fechaNacimiento'] ? new Date(this.member['fechaNacimiento']) : null;
    dateTemp?.setHours(dateTemp.getHours() + 12);
    dateTemp?.toISOString().slice(0, 10);

    this.formDataUser = new FormGroup({
      nombres: new FormControl(this.member['nombres'], [Validators.required, Validators.minLength(3), Validators.maxLength(30), Validators.pattern('[a-z A-z äáàëéèíìöóòúùñçñÑ]*')]),
      apellidos: new FormControl(this.member['apellidos'], [Validators.required, Validators.minLength(3), Validators.maxLength(30), Validators.pattern('[a-z A-z äáàëéèíìöóòúùñçñÑ]*')]),
      correo: new FormControl(this.member['correo'], [Validators.required, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')]),
      correo_recuperacion: new FormControl(this.member['correoRecuperacion'], [Validators.email, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-]+.[a-zA-Z0-9-]{2,4}$')]),
      numeroDocumento: new FormControl(this.member['numeroDocumento'], [Validators.required, Validators.minLength(7), Validators.maxLength(10), Validators.pattern('[0-9]*')]),
      direccion: new FormControl(this.member['direccion'], [Validators.required, Validators.minLength(4), Validators.maxLength(60), Validators.pattern('[a-zA-z0-9 #-.\]*')]),
      barrio: new FormControl(this.member['barrio'], [Validators.required, Validators.minLength(4), Validators.maxLength(30), Validators.pattern('[a-z A-z äáàëéèíìöóòúùñçñÑ0-9]*')]),
      telefono: new FormControl(this.member['telefono'], [Validators.required, Validators.minLength(10), Validators.pattern('[0-9]*')]),
      fechaNacimiento: new FormControl(dateTemp, [Validators.required]),
      namedepmunicipio: new FormControl(this.getNameDepMunFromId(this.member['idmunicipio'] || 0)),
      idtipoDocumentos: new FormControl(this.member['idtipoDocumentos'], [Validators.required]),
      idmunicipio: new FormControl(this.member['idmunicipio'] || null, [Validators.required]),
      genero: new FormControl(this.member['genero'], [Validators.required]),
      estadoCivil: new FormControl(this.member['estadoCivil']),
      ocupacion: new FormControl(this.member['ocupacion']),
      eps: new FormControl(this.member['eps']),
    });

    if (this.userType == 'usuario') {
      this.formDataUser.addControl('idestadosCivil', new FormControl(this.member['idestadosCivil']));
      // this.formDataUser.addControl('empresa', new FormControl(this.member['empresa'] || '"empresa" sin definir en backend'));
    }
  }

  async validateMail() {
    console.log('modal validate mail');
    const modal = await this.modalController.create({
      component: ModalValidateAccountComponent,
      componentProps: { typeValidation: 'correo', title: 'Email', member: this.member },
      cssClass: 'modal__validate'
    })

    modal.present()
  }

  focusDropdownSearch(any) {
    this.formDataUser.controls.namedepmunicipio.setValue('');
    this.searchDeptMun(any as HTMLInputElement);
  }

  blurDropdownSearch() {
    setTimeout(() => {
      let idMun = this.formDataUser.value.idmunicipio;
      this.formDataUser.controls.namedepmunicipio.setValue(this.getNameDepMunFromId(idMun));
      this.departmentsAndTowns = undefined;
    }, 100);
  }

  searchDeptMun(event: HTMLInputElement) {
    this.departmentsAndTowns = this._globals.DEPARTMENTSANDMUNI.filter(el => {
      let mun = el.nombreMunicipio.toLocaleLowerCase()
      let dep = el.nombreDepartamento.toLocaleLowerCase()
      if (mun.includes(event.value.toLocaleLowerCase()) || dep.includes(event.value.toLocaleLowerCase())) {
        //console.log('Aqui');
        //console.log(event.value);

        return true
      };
    })
  }

  selectDeptMun(target: HTMLElement) {
    console.log(target);

    let selDepMun = target.getAttribute('data-depmun-id');
    this.formDataUser.controls.idmunicipio.setValue(selDepMun);
    this.blurDropdownSearch();
  }

  getNameDepMunFromId(idDepMun: number): string {
    let nameDep = this._globals.DEPARTMENTSANDMUNI.find(depMun => {
      return depMun.idmunicipio == idDepMun;
    });

    if (!nameDep) {
      return '';
    }
    else {
      return `${nameDep?.nombreMunicipio} - ${nameDep?.nombreDepartamento}`;
    }
  }

  showDatePicker() {
    let dateTemp = new Date(this.member['fechaNacimiento']);
    dateTemp.setHours(dateTemp.getHours() + 12);
    dateTemp.toISOString().slice(0, 10);

    this.datePicker.show({
      androidTheme: this.datePicker.ANDROID_THEMES.THEME_HOLO_DARK,
      titleText: 'Fecha de nacimiento',
      maxDate: new Date().valueOf() - (18 * 365 * 24 * 60 * 60 * 1000),
      date: this.member['fechaNacimiento'] ? dateTemp : new Date(),
      mode: 'date'.toString(),
    }).then(
      date => this.formDataUser.controls.fechaNacimiento.setValue(date.toISOString()),
      err => err != 'cancel' && this._utilitiesService.showToast('No se puede mostrar el calendario', 2000)
    );
  }


  async updateDataUser() {
    console.log('updateDataUser', this.formDataUser);
    let data = {
      userData: {
        "member": {
          "idMembers": this.member['idMembers'],
          "correo": this.formDataUser.value.correo,
          "correoRecuperacion": this.formDataUser.value.correo_recuperacion,
          "telefono": this.formDataUser.value.telefono,
          "numeroDocumentoUser": parseInt(this.formDataUser.value.numeroDocumento),
          "idtipoDocumentos": this.formDataUser.value.idtipoDocumentos
        },
        "infoPerfil": {
          "nombres": this.formDataUser.value.nombres,
          "apellidos": this.formDataUser.value.apellidos,
          "fechaNacimiento": `${this.formDataUser.value.fechaNacimiento}`.formatDate(),
          "genero": this.formDataUser.value.genero,
          "direccion": this.formDataUser.value.direccion,
          "barrio": this.formDataUser.value.barrio,
          "ocupacion": this.formDataUser.value.ocupacion,
          "eps": this.formDataUser.value.eps,
          "idmunicipio": parseInt(this.formDataUser.value.idmunicipio),
          "idestadosCivil": this.formDataUser.value.idestadosCivil,
        }
      },
      images: {
        avatarProfile: this.avatarFile || undefined,
        coverpageProfile: this.coverpageFile || undefined,
        idUsuarios: this.member['idUsuarios'],
        idMembers: this.member['idMembers']
      }
    }

    if (this.userType == 'usuario') {
      data.userData.infoPerfil['idCargos'] = 6;
      data.userData.infoPerfil['idUsuarios'] = this.member['idUsuarios'];
    }

    if (this.userType == 'medico') {
      data.userData.infoPerfil['tarjetaProfecional'] = this.member['tarjetaProfecional'];
      data.userData.infoPerfil['idEspecialidad'] = this.member['idEspecialidad'];
      data.userData.infoPerfil['idMedico'] = this.member['idMedico'];
      data.userData.infoPerfil['experiencia'] = [];
      data.userData.infoPerfil['estudios'] = [];
    }

    let temp = await this._userService.updateUserData(data, this.member['tipoCuenta']);
    (temp && !this.member['validada']) && await this._userService.updateValidateData(this.member['idMembers']);
  }

  verifyAge() {
    let adult = new Date();
    adult.setFullYear(adult.getFullYear() - 18);
    adult.toISOString().slice(0, 10);

    let date = new Date(this.formDataUser.value.fechaNacimiento);

    this.isAdult = date < adult;
  }

  async verifyDocument(target) {
    this.documentRegistered = undefined;
    let documentId = this.formDataUser.get('numeroDocumento');
    let documentType = this.formDataUser.get('idtipoDocumentos');

    if (documentId.valid && documentId.value != '') {
      this._utilitiesService.showLoaderInput(target.parentElement.lastElementChild.querySelector('.loading__input'));
      let rs = await this._authService.verifyDocument(documentId.value);
      setTimeout(() => {
        this.documentRegistered = rs;
        rs != undefined && this._utilitiesService.hideLoaderInput(target.parentElement.lastElementChild.querySelector('.loading__input'));
      }, 1000);
    }
  }

  setAvatarFile(avatarFile) {
    console.log(avatarFile);
    this.avatarFile = avatarFile;
  }

  setCoverpageFile(coverpageFile) {
    console.log(coverpageFile);
    this.coverpageFile = coverpageFile;
  }

  getTypeDocumentString(type_document_id) {
    let typeDoc = this._globals.DOCUMENTYPES.find(type_doc => type_doc.idtipoDocumentos == type_document_id);
    return typeDoc ? typeDoc.tipo : '';
  }

  getDepartmentsAndTownsString(id_dep_mun) {
    let dept = this._globals.DEPARTMENTSANDMUNI.find(depts => depts.idmunicipio == id_dep_mun)
    return dept ? `${dept.nombreMunicipio}, ${dept.nombreDepartamento}` : '';
  }

  goToBack() {
    (!!this.avatarFile || !!this.coverpageFile || this.formDataUser.touched)
      && this._utilitiesService.showConfirmDialog('Información', '¿Tienes cambios sin guardar, deseas descartarlos?', 'Conservar', 'Descartar')
        .then(rs => rs ? this.updateDataUser() : this.navCtrl.back())
  }
}
