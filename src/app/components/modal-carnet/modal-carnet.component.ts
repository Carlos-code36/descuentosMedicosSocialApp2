import { Component } from '@angular/core';
import { Globals } from '@app/globals';
import { BeneficiariesService, UtilitiesService } from '@app/services';
import { ModalController, NavParams } from '@ionic/angular';

import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import domtoimage from 'dom-to-image';

@Component({
  selector: 'app-modal-carnet',
  templateUrl: './modal-carnet.component.html',
  styleUrls: ['./modal-carnet.component.scss'],
})
export class ModalCarnetComponent{

  dataUser: any;
  idGrupos: any;
  Beneficiarios: Array<any> = [];
  mes: any;
  year: any;

  constructor(
    private navParams: NavParams,
    private modalController: ModalController,
    private _beneficiariesService: BeneficiariesService,
    private _utilityService: UtilitiesService,
    public _globals: Globals,
  ) {
    this.dataUser = navParams.get('dataUser')
    this.getBeneficiarios()
    this.mes = new Date().getMonth();
    this.year = new Date().getFullYear()
    console.log(this.dataUser);
   }

  async getBeneficiarios(){
   this._beneficiariesService.getBeneficiariesGroupByMember(this.dataUser['idMembers']).subscribe(res => {
     this.Beneficiarios = res[0].beneficiarios;
     console.log(this.Beneficiarios);
   })
  }

  async gerenerarCarnet(_element){
    let _output = await this._utilityService.generateImg(_element, true);
    this._utilityService.showLocalNotification({ text: 'Se guardó correctamente el carnet', title: 'carnet guardado' });
    this.modalController.dismiss();
  }

  close() {
    this.modalController.dismiss();
  }
}
