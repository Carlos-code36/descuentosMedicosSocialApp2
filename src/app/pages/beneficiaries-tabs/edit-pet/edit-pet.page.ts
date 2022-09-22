import { FormControl, Validators } from '@angular/forms';
import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { DatePicker } from '@ionic-native/date-picker/ngx';

import { UserService, AuthService, UtilitiesService, BeneficiariesService } from '@app/services';
import { Globals } from '@app/globals';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-edit-pet',
  templateUrl: './edit-pet.page.html',
  styleUrls: ['./edit-pet.page.scss'],
})
export class EditPetPage {
  currentPet: any;
  pet: Array<any> = []
  mascota: any;
  idPet: any;
  formEditPet: FormGroup;

  userType: string = undefined;

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
    private _beneficiariesService: BeneficiariesService,
    private _utilitiesService: UtilitiesService
  ) {
    this.idPet = this.activatedRoute.snapshot.params.id_pet;
    this.getMascotas()
  }

  async ngOnInit() {
    //this.pruebaFind();
    //this.inicializeForm();
  }

  async getMascotas(){
    this._beneficiariesService.getDataGroup(this._globals.GROUP['idGrupos']).subscribe( res => {
      this.pet = res.mascotas;
      this.currentPet = this.pet[0];
      this.pruebaFind(this.pet)
    });
  }

  async pruebaFind(pet){
    for (let i = 0; i < pet.length; i++) {
      if (pet[i].idMascotas == this.idPet) {
        this.currentPet = pet[i]
        this.mascota = pet[i];
        this.inicializeForm(this.currentPet)
        //console.log(this.currentPet);
      }
    }
  }

  inicializeForm(mascota) {
    let dateTemp = mascota['fechaNacimiento'];
    
    //dateTemp.setHours(dateTemp.getHours() + 12);
    //dateTemp.toISOString().slice(0, 10);

    console.log(mascota, dateTemp);

    this.formEditPet = new FormGroup({
      apellidosMascota: new FormControl(mascota['apellidosMascota'], [Validators.required, Validators.minLength(2)]),
      nombreMascota: new FormControl(mascota['nombreMascota'], [Validators.required, Validators.minLength(2)]),
      esterilizado: new FormControl(mascota['esterilizado'], [Validators.required, Validators.minLength(2), Validators.maxLength(2)]),
      especie: new FormControl(mascota['especie'], [Validators.required]),
      color: new FormControl(mascota['color'], [Validators.required]),
      raza: new FormControl(mascota['raza'], [Validators.required]),
      sexo: new FormControl(mascota['sexo'], [Validators.required]),
      fechaNacimiento: new FormControl(dateTemp || null, [Validators.required]),
    })
  }

  showPhotoAvatar(file?) { }

  setAvatarFile(avatarFile) {
    console.log('Aqui');
    
    console.log(avatarFile);
    this.avatarFile = avatarFile;
  }

  setCoverpageFile(coverpageFile) {
    this.coverpageFile = coverpageFile;
  }

  showDatePicker() { }

  loadImage() { }

  async updatePet() {
    let data = {
      petData: {
        fechaNacimiento: `${this.formEditPet.get('fechaNacimiento').value}`.formatDate(),
        esterilizado: this.formEditPet.value.esterilizado,
        apellidosMascota: this.formEditPet.get('apellidosMascota').value,
        sexo: this.formEditPet.value.sexo,
        nombreMascota: this.formEditPet.get('nombreMascota').value,
        especie: this.formEditPet.get('especie').value,
        color: this.formEditPet.get('color').value,
        idMascotas: this.currentPet['idMascotas'],
        raza: this.formEditPet.get('raza').value,
      },
      images: {
        avatarProfile: this.avatarFile || undefined,
        coverpageProfile: this.coverpageFile || undefined,
        idMascotas: this.currentPet['idMascotas']
      }
    }

    //console.log(data.petData.sexo);
    //console.log(data.petData.esterilizado);
    
    await this._userService.updatePetBeneficiary(data);
  }

  goToBack() {
    (!!this.avatarFile || !!this.coverpageFile || this.formEditPet.touched || !this.modified)
      && this._utilitiesService.showConfirmDialog('Información', '¿Tienes cambios sin guardar, deseas descartarlos?', 'Conservar', 'Descartar')
        .then(rs => rs ? this.updatePet() : this.navCtrl.back())
  }
}
