import { Component } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';

@Component({
  selector: 'app-modal-detail-services',
  templateUrl: './modal-detail-services.component.html',
  styleUrls: ['./modal-detail-services.component.scss'],
})
export class ModalDetailServicesComponent {

  title: string = 'Default title';
  appoinmentData: Object;
  dataService;
  id_municipio;
  id_empresa;
  id_members;
  id_especialidad;

  constructor(
    private navParams: NavParams,
    private modalController: ModalController,
  ) { 
    this.dataService = this.navParams.get('data_service');
    this.id_municipio = this.navParams.get('id_municipio');
    this.id_empresa = this.navParams.get('id_empresa');
    this.id_members = this.navParams.get('id_members');
    this.id_especialidad = this.navParams.get('id_especialidad');
  }

  close() {
    this.modalController.dismiss();
  }

}
