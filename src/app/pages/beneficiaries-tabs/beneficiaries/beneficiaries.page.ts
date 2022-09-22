import { IonSlides } from '@ionic/angular';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { BeneficiariesService, GlobalDataService, UtilitiesService } from '@app/services';
import { Globals } from '@app/globals';

@Component({
  selector: 'app-beneficiaries',
  templateUrl: './beneficiaries.page.html',
  styleUrls: ['./beneficiaries.page.scss'],
})
export class BeneficiariesPage {
  @ViewChild('slideBeneficiaries') slides: IonSlides;

  // beneficiarySelected: Object = this._globals.BENEFICIARIES[0];
  beneficiaries: Array<any> = [];
  groupsBeneficiaries: Array<any> = [];
  firstGroup: Object;
  group: any;

  loadingData: boolean = true;

  slideOpts = {
    centeredSlides: true,
    slidesPerView: 1.2,
    spaceBetween: 15,
    initialSlide: 0,
    pager: false,
    // loop: true
  };

  constructor(
    private _beneficiariesService: BeneficiariesService,
    private _globalDataService: GlobalDataService,
    private _utilitiesService: UtilitiesService,
    public _globals: Globals,
    private router: Router,
  ) { }

  async ionViewWillEnter() {
    await this._globalDataService.getBeneficiaries();
    this._globals.BENEFICIARIES && this._beneficiariesService.getDataGroup(this._globals.GROUP['idGrupos']).subscribe(rs => { this.group = rs });
    console.log(this._globals.GROUP['idGrupos']);
    this.pruebaBeneficiarios()
  }

  pruebaBeneficiarios(){
    this._beneficiariesService.getDataGroup(this._globals.GROUP['idGrupos']).subscribe(res => {
      this.beneficiaries = res.beneficiarios
      console.log(this.beneficiaries.length);
      this._globals.BENEFICIARIES = this.beneficiaries
      //console.log(this._globals.BENEFICIARIES);
      
    })
  }
  
  addBeneficiaryToGroup() {
    if (this.group) {
      if (this.group.mascotas.length + this.group.beneficiarios.length == 10) {
        this._utilitiesService.showInfoDialog('Información', `Tu cuenta ya alcanzó sus 10 Beneficiarios permitidos, si deseas ampliar el número de beneficiarios, comunicate a nuestras líneas de asesoría al whatsapp 321 6696602.`);
        // this._utilitiesService.showConfirmDialog('Información', `Tu cuenta ya alcanzó sus 10 Beneficiarios permitidos. Si deseas puedes ampliar el número de beneficiarios, puedes comunicarte a nuestras líneas de asesoría, al whatsapp 3216696602.`, 'Aceptar');
        return;
      }

      this.router.navigate([`/beneficiaries/create/person/${this.group['idGrupos']}/grp_${this._globals.USER_OBJECT['idMembers']}`]);
    } else {
      console.log('not group')
      this.router.navigate([`/beneficiaries/create/person/0/grp_${this._globals.USER_OBJECT['idMembers']}`]);
    }
  }

  editBeneficiary(beneficiary) {
    this.router.navigate([`/beneficiaries/edit/${beneficiary['idMembers']}`]);
  }

  // async slideBeneficiary() {
  //   let swiper = await this.slides.getSwiper();
  //   let activeIndex = await this.slides.getActiveIndex();

  //   this.loadingData = true;
  //   setTimeout(() => this.loadingData = false, 500);

  //   this.beneficiarySelected = this._globals.BENEFICIARIES[activeIndex+1];
  // }

  getDepartmentsAndTownsString(id_dep_mun) {
    let dept = this._globals.DEPARTMENTSANDMUNI.find(depts => depts.idmunicipio == id_dep_mun)
    return dept ? `${dept.nombreMunicipio}, ${dept.nombreDepartamento}` : '';
  }

  getTypeDocumentString(type_document_id) {
    let typeDoc = this._globals.DOCUMENTYPES.find(type_doc => type_doc.idtipoDocumentos == type_document_id);
    return typeDoc ? typeDoc.tipo : '';
  }

  /* deletBeneficiary(){
    this._beneficiariesService.getBeneficiariesGroupByMember(this._globals.USER_OBJECT['idMembers']).subscribe( res => {
      
      this.groupsBeneficiaries = res;
      this.beneficiaries = this.groupsBeneficiaries.map(e => e.beneficiarios).flat();
      console.log(this.beneficiaries);
    } )
  } */
}