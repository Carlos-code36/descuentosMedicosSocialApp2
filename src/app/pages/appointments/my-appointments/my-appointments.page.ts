import { ModalController } from '@ionic/angular';
import { Component } from '@angular/core';

import { Globals } from '@app/globals';
import { AppointmentsService, UtilitiesService } from '@app/services';
import { Router } from '@angular/router';
import { ModalRateServiceComponent } from '@app/components/modal-rate-service/modal-rate-service.component';
import { AlertController } from '@ionic/angular';
import { ModalReciboComponent } from '@app/components/modal-recibo/modal-recibo.component';
@Component({
  selector: 'app-my-appointments',
  templateUrl: './my-appointments.page.html',
  styleUrls: ['./my-appointments.page.scss']
})
export class MyAppointmentsPage {
  appointments: Array<any>;
  appointmentsBeneficiaries: Array<any>;
  disabledB:boolean;
  edited: boolean = false;

  constructor(
    private _appointmentsService: AppointmentsService,
    private _utilitiesService: UtilitiesService,
    private modalController: ModalController,
    public _globals: Globals,
    private router: Router,
    private alertController: AlertController,
    
  ) { }

  ionViewWillEnter() {
    this.getActiveAppointments();
    console.log(this.getActiveAppointments());
    // this.activarBotones();

  }
  async getActiveAppointments() {
    this.edited = false;
    let userId = this._globals.USER_OBJECT['idMembers'];
    this.appointments = await this._appointmentsService.getAppoinmentsActive(userId);
    console.log(this.appointments);
    
    this.appointmentsBeneficiaries = await this._appointmentsService.getAppoinmentsActiveBeneficiary(userId);
    console.log(this.appointmentsBeneficiaries);
  }

  async reprogramAppointment(appoinment) {
    let output = await this._utilitiesService.showConfirmDialog('Reprogramar cita', '¿Esta seguro que desea cancelar y reprogramar su cita?')
    output && this.reprogram(appoinment)
  }

  async cancelAppointment(appoinment) {
    let res = await this._utilitiesService.showConfirmDialog('Cancelar cita', '¿Esta seguro que desea cancelar su cita?')
    console.log(appoinment['idCitasmedicasactivas']);
    let out = res && this._appointmentsService.cancelAppointment(appoinment['idCitasmedicasactivas']);
    out && this.getActiveAppointments();
  }
  
  async confirmAppointment(appoinment) {
    let res = await this._utilitiesService.showConfirmDialog('Confirmar cita', '¿Esta seguro que desea confirmar su cita?' , 'Confirmar','Cancelar')

    if(res==true) {
      let out = this._appointmentsService.confirmAppointment(appoinment['idCitasmedicasactivas'],1);
    }
    else {
      let out = this._appointmentsService.confirmAppointment(appoinment['idCitasmedicasactivas'],0);
      // out && this.getActiveAppointments();
    }
  }
  reprogram(appoinment) {
    console.log(appoinment);
    
    this._utilitiesService.showLoader();
    let urlPartial = `${appoinment['idmunicipio']}_${appoinment['idServicios']}_${appoinment['idEmpresa']}`;

    setTimeout(() => {
      this.router.navigate([`/appointments/new-appoinment/${urlPartial}/${appoinment['idMembers']}/${appoinment['idCitasmedicasactivas']}/${appoinment['idSubServicios']}`])
      this._utilitiesService.closeLoader();
    }, 500);
  }

  async verOrdenDescuento(index?){
    console.log(index);
    
    let modal = await this.modalController.create({
      component: ModalReciboComponent,
      componentProps:{
        data_appointment: this.appointments[0],
        data_cita: this.appointments,
        data_beneficiarios: this.appointmentsBeneficiaries,
        data_index: index
      }
    })

    modal.present();
  }
  // async activarBotones() {
  //   let userId = this._globals.USER_OBJECT['idMembers'];
  //   this.appointments = await this._appointmentsService.getAppoinmentsActive(userId);
  //   console.log(this.appointments);
  //   this.appointments.forEach(element => {
  //     if(element.estado== 1) {
  //       this.disabledB = true;
  //     }
  //     else {
  //       this.disabledB = false;
  //     }
  //     console.log("AQUUUIIIII",this.disabledB);
  //   }
  //   );
  // }
}

// async detailAppointment(appointment) {
//   let modal = await this.modalController.create({
//     component: ModalDetailAppoinmentComponent,
//     cssClass: 'modal__detail',
//     backdropDismiss: false,
//     componentProps: {
//       title: 'Información cita',
//       patient: this._globals.USER_OBJECT,
//       appointment,
//     }
//   });
//   modal.onDidDismiss().then(data => {
//     this.getActiveAppointments();
//   })
//   modal.present();
// }