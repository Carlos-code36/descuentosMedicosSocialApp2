import { ActionSheetController } from '@ionic/angular';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DatePicker } from '@ionic-native/date-picker/ngx';
import { ActivatedRoute } from '@angular/router';

import { Crop } from '@ionic-native/crop/ngx';
import { PhotoViewer } from '@ionic-native/photo-viewer/ngx';
import { Plugins, CameraResultType, CameraSource } from '@capacitor/core';

import { BeneficiariesService, UtilitiesService, AuthService, GlobalDataService } from '@app/services';

import { environment } from 'src/environments/environment';
import { Globals } from '@app/globals';

const { Camera } = Plugins;

@Component({
  selector: 'app-add-beneficiary',
  templateUrl: './add-beneficiary.page.html',
  styleUrls: ['./add-beneficiary.page.scss'],
})
export class AddBeneficiaryPage implements OnInit {
  [x: string]: any;
  departmentsAndTowns: Array<any>;

  formNewBeneficiary: FormGroup;
  formNewPet: FormGroup;

  isPet: boolean = false;

  newGroup: String;
  group: Object = null;
  emailRegistered = undefined;
  documentRegistered = undefined;

  isAdult: boolean;

  imageViewerCoverpage: any;
  imageViewerProfile: any;
  imageFileCoverpage: any;
  imageFileProfile: any;
  image;

  constructor(
    private crop: Crop,
    public _globals: Globals,
    private datePicker: DatePicker,
    private photoViewer: PhotoViewer,
    private _authService: AuthService,
    private activatedRoute: ActivatedRoute,
    private _utilitiesService: UtilitiesService,
    private _globalDataService: GlobalDataService,
    public actionSheetController: ActionSheetController,
    private _beneficiariesService: BeneficiariesService,
  ) { }

  ngOnInit() {
    this.inicializeForm();
  }

  async ionViewWillEnter() {
    let groupId = this.activatedRoute.snapshot.params.group_id;
    this.isPet = this.activatedRoute.snapshot.params.group_type == 'pet';

    if (groupId == 0) {
      console.log('new group');

      this.newGroup = this.activatedRoute.snapshot.params.group_name;
      return
    };

    this.group = await this._beneficiariesService.getDataGroup(groupId).toPromise();
    console.log(this.group);
  }

  inicializeForm() {
    this.formNewBeneficiary = new FormGroup({
      apellidos: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(30), Validators.pattern('[a-z A-z äáàëéèíìöóòúùñçñÑ]*')]),
      nombres: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(30), Validators.pattern('[a-z A-z äáàëéèíìöóòúùñçñÑ]*')]),
      numeroDocumento: new FormControl('', [Validators.required, Validators.minLength(7), Validators.maxLength(10), Validators.pattern('[0-9]*')]),
      // fechaNacimiento: new FormControl('12/12/1989', Validators.required),
      fechaNacimiento: new FormControl(null, Validators.required),
      idtipoDocumentos: new FormControl(7, Validators.required),
      idParentescos: new FormControl('', Validators.required),
      genero: new FormControl('', Validators.required),

      direccion: new FormControl('', [Validators.minLength(2), Validators.maxLength(30)]),
      barrio: new FormControl('', [Validators.minLength(2), Validators.maxLength(30), Validators.pattern('[a-z A-z 0-9 äáàëéèíìöóòúùñçñÑ]*')]),
      correo: new FormControl('', [Validators.email, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-]{2,4}$')]),
      telefono: new FormControl('', [Validators.minLength(10), Validators.pattern('[0-9]*')]),
      namedepmunicipio: new FormControl(''),
      idestadosCivil: new FormControl(''),
      idmunicipio: new FormControl(''),
      estadoCivil: new FormControl(''),
      ocupacion: new FormControl(''),
      eps: new FormControl('')
    });

    this.formNewPet = new FormGroup({
      apellidosMascota: new FormControl('', [Validators.required, Validators.minLength(2)]),
      nombreMascota: new FormControl('', [Validators.required, Validators.minLength(2)]),
      esterilizado: new FormControl(false, [Validators.required, Validators.minLength(2), Validators.maxLength(2)]),
      // fechaNacimiento: new FormControl('12/12/1989', Validators.required),
      fechaNacimiento: new FormControl(null, Validators.required),
      especie: new FormControl('', [Validators.required]),
      color: new FormControl('', [Validators.required]),
      raza: new FormControl('', [Validators.required]),
      sexo: new FormControl(false, [Validators.required])
    })
  }

  /**
   * Método que realiza la contrucción del nuevo grupo a agregar y enviar a la api.
   */
  saveBeneficiary() {
    let data = {
      group: {
        grupoFamiliar: {
          idGrupos: this._globals.GROUP ? this.group['idGrupos'] : '',
          nombreCreador: `${this._globals.USER_OBJECT['nombres'].split(' ')[0]} ${this._globals.USER_OBJECT['apellidos'].split(' ')[0]}`,
          beneficiarios: [],
          mascotas: []
        }
      },
      avatar: this.imageFileProfile
    }

    if (!this._globals.GROUP) {
      data.group.grupoFamiliar['nombreGrupo'] = `grp_${this._globals.USER_OBJECT['idMembers']}`;
      data.group.grupoFamiliar['creadoPor'] = this._globals.USER_ID;
      data.group.grupoFamiliar['avatar'] = "avatarundefined.png";
    }

    if (!this.isPet) {
      let age = this.calculeAge(this.formNewBeneficiary.value.fechaNacimiento);

      data.group.grupoFamiliar.beneficiarios = [
        {
          correo: this.formNewBeneficiary.value.correo.toLowerCase(),
          telefono: this.isAdult ? this.formNewBeneficiary.value.telefono : this._globals.USER_OBJECT['telefono'],
          numeroDocumentoUser: parseInt(this.formNewBeneficiary.value.numeroDocumento),
          idtipoDocumentos: this.formNewBeneficiary.value.idtipoDocumentos,
          nombres: this.formNewBeneficiary.value.nombres,
          apellidos: this.formNewBeneficiary.value.apellidos,
          direccion: this.formNewBeneficiary.value.direccion,
          barrio: this.formNewBeneficiary.value.barrio,
          fechaNacimiento: `${this.formNewBeneficiary.value.fechaNacimiento}`.formatDate(),
          genero: this.formNewBeneficiary.value.genero,
          idmunicipio: this.isAdult ? parseInt(this.formNewBeneficiary.value.idmunicipio) : this._globals.USER_OBJECT['idmunicipio'],
          idParentescos: this.formNewBeneficiary.value.idParentescos || 16,
          puedeSacarCita: age >= 18 ? 1 : 0,
          puedeAgregarBene: age >= 18 ? 1 : 0
        }
      ];
    }

    if (this.isPet) {
      data.group.grupoFamiliar.mascotas = [
        {
          esterilizado: this.formNewPet.value.esterilizado ? 'si' : 'no',
          apellidosMascota: this.formNewPet.value.apellidosMascota,
          fechaNacimiento: '2010-02-01',
          sexo: this.formNewPet.value.sexo ? 'Macho' : 'Hembra',
          nombreMascota: this.formNewPet.value.nombreMascota,
          especie: this.formNewPet.value.especie,
          color: this.formNewPet.value.color,
          raza: this.formNewPet.value.raza,
          dueno: this._globals.USER_ID
        }
      ];
    }

    this._beneficiariesService.createGroup(data, this.isPet);
    console.log(this.imageFileProfile);
    console.log(data);
  }

  focusDropdownSearch(value: HTMLInputElement | any) {
    this.formNewBeneficiary.controls.namedepmunicipio.setValue('');
    this.searchDeptMun(value);
  }

  blurDropdownSearch() {
    let idMun = this.formNewBeneficiary.value.idmunicipio;

    this.formNewBeneficiary.controls.namedepmunicipio.setValue(this.getNameDepMunFromId(idMun));
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
    this.formNewBeneficiary.controls.idmunicipio.setValue(selDepMun);
    this.blurDropdownSearch();
  }

  getNameDepMunFromId(idDepMun: number): string {
    let nameDep = this._globals.DEPARTMENTSANDMUNI.find(depMun => {
      return depMun.idmunicipio == idDepMun;
    });

    return `${nameDep.nombreMunicipio} - ${nameDep.nombreDepartamento}`;
  }

  /**
   * Method to show date picker component.
   * @param isPet Boolean flag to know if is pet the new beneficiary.
   */
  showDatePicker(isPet?) {
    console.log(this.formNewBeneficiary.value.fechaNacimiento);

    if (isPet) {
      this.datePicker.show({
        androidTheme: this.datePicker.ANDROID_THEMES.THEME_HOLO_DARK,
        titleText: 'Fecha de nacimiento',
        maxDate: new Date().valueOf(),
        date: this.formNewPet.value.fechaNacimiento ? new Date(this.formNewPet.value.fechaNacimiento) : new Date(),
        mode: 'date',
      }).then(
        date => this.formNewPet.controls.fechaNacimiento.setValue(date.toISOString()),
        err => err == 'cancel' ? null : this._utilitiesService.showToast('Calendario no soportado por el dispositivo', 2000)
      );

      return
    }

    this.datePicker.show({
      androidTheme: this.datePicker.ANDROID_THEMES.THEME_HOLO_DARK,
      titleText: 'Fecha de nacimiento',
      maxDate: new Date().valueOf(),
      date: this.formNewBeneficiary.value.fechaNacimiento ? new Date(this.formNewBeneficiary.value.fechaNacimiento) : new Date(),
      mode: 'date',
    }).then(
      date => this.formNewBeneficiary.controls.fechaNacimiento.setValue(date.toISOString()),
      err => err == 'cancel' ? null : this._utilitiesService.showToast('Calendario no soportado por el dispositivo', 2000)
    );
  }

  calculeAge(dateAge) {
    let today = new Date().getTime();
    let person = new Date(dateAge).getTime();

    return Math.floor((today - person) / 31556900000);
  }

  async loadImage() {
    const actionSheet = await this.actionSheetController.create({
      header: `Agregar foto beneficiario`,
      buttons: [
        {
          text: 'Cargar desde galería',
          handler: () => this.getPicture(CameraSource.Photos)
        },
        {
          text: 'Tomar desde la camara',
          handler: () => this.getPicture(CameraSource.Camera)
        },
        {
          text: 'Cancelar',
          role: 'cancel'
        }
      ]
    });
    await actionSheet.present();
  }

  getPicture(sourceType) {
    Camera.getPhoto({
      quality: 100,
      width: 800,
      height: 800,
      preserveAspectRatio: true,
      allowEditing: false,
      resultType: CameraResultType.Uri,
      source: sourceType,
      saveToGallery: false
    }).then(imageData => {
      return this.crop.crop(imageData.path, { quality: 100 })
    }).then(croppedImage => {
      this.imageViewerProfile = (<any>window).Ionic.WebView.convertFileSrc(croppedImage.split('?')[0]);
      this.imageFileProfile = croppedImage;
    }).catch(err => {
      this._utilitiesService.showToast('Error inesperado, no se puede acceder a la camara.');
    })
  }

  showPhotoAvatar(photo?) {
    console.log(photo);

    if (photo) this.photoViewer.show(photo, '', { share: false });
    else this.photoViewer.show(`${environment.apiUrl}/avatar/avatarundefined.png`, 'Foto beneficiario', { share: false });
  }

  async verifyEmail(target) {
    this.emailRegistered = undefined;
    let formEmail = this.formNewBeneficiary.get('correo');

    console.log(formEmail);

    if (formEmail.valid && formEmail.value != '') {
      this._utilitiesService.showLoaderInput(target.parentElement.lastElementChild.querySelector('.loading__input'));

      let rs = await this._authService.verifyEmail(formEmail.value);

      setTimeout(() => {
        this.emailRegistered = rs;
        rs != undefined && this._utilitiesService.hideLoaderInput(target.parentElement.lastElementChild.querySelector('.loading__input'));
      }, 1000);
    }
  }

  async verifyDocument(target) {
    this.documentRegistered = undefined;
    let documentId = this.formNewBeneficiary.get('numeroDocumento');
    let documentType = this.formNewBeneficiary.get('idtipoDocumentos');

    if (documentId.valid && documentId.value != '') {

      console.log('Ready', target);

      this._utilitiesService.showLoaderInput(target.parentElement.lastElementChild.querySelector('.loading__input'));

      let rs = await this._authService.verifyDocument(documentId.value);

      setTimeout(() => {
        this.documentRegistered = rs;
        rs != undefined && this._utilitiesService.hideLoaderInput(target.parentElement.lastElementChild.querySelector('.loading__input'));
      }, 1000);
    }
  }

  verifyAge() {
    let adult = new Date();
    adult.setFullYear(adult.getFullYear() - 18);
    adult.toISOString().slice(0, 10);
    let date = new Date(this.formNewBeneficiary.value.fechaNacimiento);
    this.isAdult = date < adult;

    if (this.isAdult) {
      this.formNewBeneficiary.get('idmunicipio').setValidators([Validators.required]);
      this.formNewBeneficiary.get('telefono').setValidators([Validators.required]);

      this.formNewBeneficiary.updateValueAndValidity();
    }
  }

  async ionViewWillLeave() {
    await this._globalDataService.getBeneficiaries()
  }
  
  pedirPermiso() {
    this._beneficiariesService.pedirPermiso().catch(err => {
      this._utilitiesService.showToast('No se realizó la solicitud de permiso.',3000);
    })

  }
  
}