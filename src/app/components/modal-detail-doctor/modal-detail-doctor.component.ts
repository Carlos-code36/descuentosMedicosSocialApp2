import { NavParams, ModalController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { UtilitiesService, AppointmentsService } from '@app/services';

@Component({
  selector: 'app-modal-detail-doctor',
  templateUrl: './modal-detail-doctor.component.html',
  styleUrls: ['./modal-detail-doctor.component.scss'],
})
export class ModalDetailDoctorComponent {

  title: string = 'Default title';
  appoinmentData: Object;
  dataDoctor;

  constructor(
    private navParams: NavParams,
    private modalController: ModalController,
    // private _utilitiesService: UtilitiesService
  ) {
    this.dataDoctor = this.navParams.get('data_doctor');
  }

  close() {
    this.modalController.dismiss();
  }

}
