import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { Router } from '@angular/router';

import { UtilitiesService } from '@app/services/utilities.service';
import { AppointmentsService } from '@services/appointments.service';

@Component({
  selector: 'app-modal-detail-appoinment',
  templateUrl: './modal-detail-appoinment.component.html',
  styleUrls: ['./modal-detail-appoinment.component.scss'],
})
export class ModalDetailAppoinmentComponent implements OnInit {
  title: string = 'Default title';
  patient;
  appoinmentData: Object;

  constructor(
    private router: Router,
    private navParams: NavParams,
    private modalController: ModalController,
    private _utilitiesService: UtilitiesService,
    private _appointmentService: AppointmentsService
  ) {
    this.title = this.navParams.get('title');
    this.appoinmentData = this.navParams.get('appointment');
    this.patient = this.navParams.get('patient');
  }

  ngOnInit() { }

  async reprogramAppointment() {
    this._utilitiesService.showConfirmDialog('Reprogramar cita', '¿Esta seguro que desea cancelar y reprogramar su cita?')
      .then(() => this.reprogram())
      .catch((error) => console.log(error));
  }

  async cancelAppointment() {
    let res = await this._utilitiesService.showConfirmDialog('Cancelar cita', '¿Esta seguro que desea cancelar su cita?')
    // console.log(res);

    res && this._appointmentService.cancelAppointment(this.appoinmentData['idCitasmedicasactivas']).then(() => this.close());
  }

  reprogram() {
    this._utilitiesService.showLoader();
    let urlPartial = `${this.appoinmentData['idmunicipio']}_${this.appoinmentData['idServicios']}_${this.appoinmentData['idEmpresa']}`;

    setTimeout(() => {
      this.router.navigate([`/appointments/new-appoinment/${urlPartial}/${this.patient['idMembers']}/${this.appoinmentData['idCitasmedicasactivas']}`]);
      this._utilitiesService.closeLoader();
      this.close();
    }, 500);
  }

  close() {
    this.modalController.dismiss();
  }
}