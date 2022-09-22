import { NavController } from '@ionic/angular';
import { UtilitiesService } from '@services/utilities.service';
import { AuthService } from '@services/auth.service';
import { DatePicker } from '@ionic-native/date-picker/ngx';
import { FormControl, Validators } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { UserService } from '@services/user.service';
import { ActivatedRoute } from '@angular/router';
import { Component } from '@angular/core';
import { Globals } from '@app/globals';

@Component({
  selector: 'app-edit-beneficiary',
  templateUrl: './edit-beneficiary.page.html',
  styleUrls: ['./edit-beneficiary.page.scss'],
})
export class EditBeneficiaryPage {
  departmentsAndTowns: Array<any>;
  documentTypes: [];

  documentRegistered = undefined;
  userType: string = undefined;
  formEditBeneficiary: FormGroup;
  emailRegistered
  isAdult: boolean;
  member: Object;
  group: Object;

  avatarFile: string;
  coverpageFile: string;

  modified: boolean = true;

  constructor(
    public _globals: Globals,
    private datePicker: DatePicker,
    private navCtrl: NavController,
    private _userService: UserService,
    private _authService: AuthService,
    private activatedRoute: ActivatedRoute,
    private _utilitiesService: UtilitiesService
  ) { }

  async ngOnInit() {
    this.member = await this._userService.getUserByID(this.activatedRoute.snapshot.params.id_members);
    console.log(this.member);
    this.inicializeForm();
    this.verifyAge();
  }

  inicializeForm() {
    let dateTemp = new Date(this.member['fechaNacimiento']);
    dateTemp.setHours(dateTemp.getHours() + 12);
    dateTemp.toISOString().slice(0, 10);

    this.formEditBeneficiary = new FormGroup({
      nombres: new FormControl(this.member['nombres'], [Validators.required, Validators.minLength(3), Validators.maxLength(30), Validators.pattern('[a-z A-z äáàëéèíìöóòúùñçñÑ]*')]),
      apellidos: new FormControl(this.member['apellidos'], [Validators.required, Validators.minLength(3), Validators.maxLength(30), Validators.pattern('[a-z A-z äáàëéèíìöóòúùñçñÑ]*')]),
      telefono: new FormControl(this.member['telefono'], [Validators.minLength(10), Validators.pattern('[0-9]*'), Validators.required]),
      idmunicipio: new FormControl(this.member['idmunicipio'] || null, [Validators.required]),
      fechaNacimiento: new FormControl(dateTemp || null, [Validators.required]),
      genero: new FormControl(this.member['genero'], [Validators.required]),

      correo_recuperacion: new FormControl(this.member['correoRecuperacion'], [Validators.email, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-]{2,4}$')]),
      barrio: new FormControl(this.member['barrio'], [Validators.minLength(4), Validators.maxLength(30), Validators.pattern('[a-z A-z 0-9 äáàëéèíìöóòúùñçñÑ]*')]),
      direccion: new FormControl(this.member['direccion'], [Validators.minLength(4), Validators.maxLength(60), Validators.pattern('[a-zA-z0-9 #-.\]*')]),
      correo: new FormControl(this.member['correo'], [Validators.email, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-]{2,4}$')]),
      namedepmunicipio: new FormControl(this.getNameDepMunFromId(this.member['idmunicipio'] || 0)),
      idestadosCivil: new FormControl(this.member['idestadosCivil']),
      estadoCivil: new FormControl(this.member['estadoCivil']),
      ocupacion: new FormControl(this.member['ocupacion']),
      eps: new FormControl(this.member['eps'])
    });
  }

  focusDropdownSearch(any: HTMLInputElement) {
    this.formEditBeneficiary.controls.namedepmunicipio.setValue('');
    this.searchDeptMun(any);
  }

  blurDropdownSearch() {
    let idMun = this.formEditBeneficiary.value.idmunicipio;
    this.formEditBeneficiary.controls.namedepmunicipio.setValue(this.getNameDepMunFromId(idMun));
    this.departmentsAndTowns = undefined;
  }

  searchDeptMun(event: HTMLInputElement) {
    this.departmentsAndTowns = this._globals.DEPARTMENTSANDMUNI.filter(el => {
      let mun = el.nombreMunicipio.toLowerCase();
      let dep = el.nombreDepartamento.toLowerCase();

      if (mun.includes(event.value) || dep.includes(event.value)) {
        return true
      };
    })
  }

  selectDeptMun(target: HTMLElement) {
    let selDepMun = target.getAttribute('data-depmun-id');
    this.formEditBeneficiary.controls.idmunicipio.setValue(selDepMun);
    this.blurDropdownSearch();
  }

  getNameDepMunFromId(idDepMun: number): string {
    let nameDep = this._globals.DEPARTMENTSANDMUNI.find(depMun => {
      return depMun.idmunicipio == idDepMun;
    });

    return `${nameDep?.nombreMunicipio} - ${nameDep?.nombreDepartamento}`;
  }

  showDatePicker() {
    let dateTemp = new Date(this.member['fechaNacimiento']);
    dateTemp.setHours(dateTemp.getHours() + 12);
    dateTemp.toISOString().slice(0, 10);

    this.datePicker.show({
      androidTheme: this.datePicker.ANDROID_THEMES.THEME_HOLO_DARK,
      titleText: 'Fecha de nacimiento',
      maxDate: new Date().valueOf(),
      date: dateTemp || new Date(),
      mode: 'date',
    }).then(
      date => {
        this.formEditBeneficiary.controls.fechaNacimiento.setValue(date.toISOString())
        this.modified = false;
      },
      err => err != 'cancel' && this._utilitiesService.showToast('No se puede mostrar el calendario', 2000)
    );
  }

  async updateBeneficiary() {
    let data = {
      userData: {
        "member": {
          idMembers: this.member['idMembers'],
          correo: this.formEditBeneficiary.value.correo || null,
          correoRecuperacion: this.formEditBeneficiary.value.correo_recuperacion || null,
          telefono: this.formEditBeneficiary.value.telefono || null,
          numeroDocumentoUser: parseInt(this.member['numeroDocumento']),
          idtipoDocumentos: this.member['idtipoDocumentos']
        },
        "infoPerfil": {
          nombres: this.formEditBeneficiary.get('nombres').value,
          apellidos: this.formEditBeneficiary.get('apellidos').value,
          fechaNacimiento: `${this.formEditBeneficiary.get('fechaNacimiento').value}`.formatDate(),
          genero: this.formEditBeneficiary.get('genero').value,
          idUsuarios: this.member['idUsuarios'],
          idCargos: this.member['idCargos'] || 6,

          direccion: this.formEditBeneficiary.value.direccion || null,
          barrio: this.formEditBeneficiary.value.barrio || null,
          ocupacion: this.formEditBeneficiary.value.ocupacion || null,
          eps: this.formEditBeneficiary.value.eps || null,
          idmunicipio: parseInt(this.formEditBeneficiary.value.idmunicipio) || null,
          idestadosCivil: this.formEditBeneficiary.value.idestadosCivil || null,
        }
      },
      images: {
        avatarProfile: this.avatarFile || undefined,
        coverpageProfile: this.coverpageFile || undefined,
        idUsuarios: this.member['idUsuarios'],
        idMembers: this.member['idMembers']
      }
    }

    console.log(data);
    await this._userService.updateBeneficiary(data, this.member['tipoCuenta']);
  }

  verifyAge() {
    let adult = new Date();
    adult.setFullYear(adult.getFullYear() - 18);
    adult.toISOString().slice(0, 10);

    let date = new Date(this.formEditBeneficiary.value.fechaNacimiento);

    this.isAdult = date < adult;

    if (this.isAdult) {
      this.formEditBeneficiary.get('correo').setValidators([Validators.required, Validators.email, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-]{2,4}$')]);
      // this.formEditBeneficiary.get('telefono').setValidators([Validators.required, Validators.minLength(10), Validators.pattern('[0-9]*')]);
      // this.formEditBeneficiary.get('idmunicipio').setValidators([Validators.required]);

      this.formEditBeneficiary.updateValueAndValidity();
    }
  }

  async verifyEmail(target) {
    this.emailRegistered = undefined;
    let formEmail = this.formEditBeneficiary.get('correo');

    if (formEmail.valid && formEmail.value != '') {
      if (formEmail.value == this.member['correo']) {
        this._utilitiesService.showLoaderInput(target.parentElement.lastElementChild.querySelector('.loading__input'));
        setTimeout(() => {
          this.emailRegistered = false;
          this._utilitiesService.hideLoaderInput(target.parentElement.lastElementChild.querySelector('.loading__input'));
        }, 1000);
      } else {
        this._utilitiesService.showLoaderInput(target.parentElement.lastElementChild.querySelector('.loading__input'));

        let rs = await this._authService.verifyEmail(formEmail.value);

        setTimeout(() => {
          this.emailRegistered = rs;
          rs != undefined && this._utilitiesService.hideLoaderInput(target.parentElement.lastElementChild.querySelector('.loading__input'));
        }, 1000);
      }

    }
  }

  async verifyDocument(target) {
    this.documentRegistered = undefined;
    let documentId = this.formEditBeneficiary.get('numeroDocumento');
    let documentType = this.formEditBeneficiary.get('idtipoDocumentos');

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
    (!!this.avatarFile || !!this.coverpageFile || this.formEditBeneficiary.touched || !this.modified)
      && this._utilitiesService.showConfirmDialog('Información', '¿Tienes cambios sin guardar, deseas descartarlos?', 'Conservar', 'Descartar')
        .then(rs => rs ? this.updateBeneficiary() : this.navCtrl.back())
  }
}
