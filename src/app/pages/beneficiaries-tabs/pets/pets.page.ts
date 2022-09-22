import { BeneficiariesService } from '@services/benificiaries.service';
import { UtilitiesService } from '@services/utilities.service';
import { GlobalDataService } from '@app/services';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Globals } from '@app/globals';

@Component({
  selector: 'app-pets',
  templateUrl: './pets.page.html',
  styleUrls: ['./pets.page.scss'],
})
export class PetsPage {
  group: any = localStorage.getItem('group');
  mascotas: Array<any> = []

  constructor(
    private _beneficiariesService: BeneficiariesService,
    private _globalDataService: GlobalDataService,
    private _utilitiesService: UtilitiesService,
    public _globals: Globals,
    private router: Router,
  ) { }

  async ionViewWillEnter() {
    await this._globalDataService.getBeneficiaries();
    this._globals.PETS && this._beneficiariesService.getDataGroup(this._globals.GROUP['idGrupos']).subscribe(rs => this.group = rs);
    this.pruebaMascotas()
  }

  pruebaMascotas(){
    this._beneficiariesService.getDataGroup(this._globals.GROUP['idGrupos']).subscribe(res => {
      this.mascotas = res.mascotas;
      console.log(this.mascotas);
      this._globals.PETS = this.mascotas;
    })
  }

  addPetToGroup() {
    if (this._globals.GROUP) {
      console.log('add pet');
      console.log(this.group.mascotas?.length||0 + this.group.beneficiarios.length);

      if (this.group.mascotas.length + this.group.beneficiarios.length == 10) {
        this._utilitiesService.showInfoDialog('Información', `Tu cuenta ya alcanzó sus 10 beneficiarios permitidos, si deseas ampliar el número de beneficiarios, comunicate a nuestras líneas de asesoría al whatsapp 321 6696602.`);
        // this._utilitiesService.showConfirmDialog('Información', `Tu cuenta ya alcanzó sus 10 Beneficiarios permitidos. Si deseas puedes ampliar el número de beneficiarios, puedes comunicarte a nuestras líneas de asesoría, al whatsapp 3216696602.`, 'Aceptar');
        return;
      }

      this.router.navigate([`/beneficiaries/create/pet/${this._globals.GROUP['idGrupos']}/grp_${this._globals.USER_OBJECT['idMembers']}`]);
    } else {
      console.log('not group')
      this.router.navigate([`/beneficiaries/create/pet/0/grp_${this._globals.USER_OBJECT['idMembers']}`]);
    }
  }

  editPet(pet){
    this.router.navigate([`/pets/edit/${pet['idMascotas']}`]);
  }

}