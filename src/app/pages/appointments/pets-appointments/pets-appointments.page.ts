import { AppointmentsService, UtilitiesService } from '@app/services';
import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Globals } from '@app/globals';

@Component({
  selector: 'app-pets-appointments',
  templateUrl: './pets-appointments.page.html',
  styleUrls: ['./pets-appointments.page.scss'],
})
export class PetsAppointmentsPage {
  petAppointments: Array<any>;

  edited: boolean = false;

  constructor(
    private _appointmentsService: AppointmentsService,
    private _utilitiesService: UtilitiesService,
    private modalController: ModalController,
    public _globals: Globals,
    private router: Router
  ) { }

  ionViewWillEnter() {
    this.getActiveAppointments();
  }

  async getActiveAppointments() {
    this.edited = false;
    let userId = this._globals.USER_OBJECT['idMembers'];
    this.petAppointments = await this._appointmentsService.getPetAppoinmentsActive(userId);
    console.log(this.petAppointments);
  }

  async reprogramAppointment(appoinment) {
    let output = await this._utilitiesService.showConfirmDialog('Reprogramar cita', '¿Esta seguro que desea cancelar y reprogramar su cita?')
    output && this.reprogram(appoinment)
  }

  async cancelAppointment(appoinment) {
    let res = await this._utilitiesService.showConfirmDialog('Cancelar cita', '¿Esta seguro que desea cancelar su cita?')
    let out = res && this._appointmentsService.cancelAppointment(appoinment['idCitasMascotasActivas'], 'mascota');
    out && this.getActiveAppointments();
  }

  reprogram(appoinment) {
    // this._utilitiesService.showLoader();
    let urlPartial = `${appoinment['idmunicipio']}_${appoinment['idServicios']}_${appoinment['idEmpresa']}_pet`;
    
    console.log(appoinment);
    console.log(urlPartial);

    //   {
    //     idCitasMascotasActivas: this.infoCita.event.resizable.idCitasMascotasActivas,
    //     fecha: this.formReprogramar.get('fecha').value + ' ' + hora.split(' ')[0] + ':00:00',
    //     hora,
    //     quienSacoCita : this.user.idMembers,
    //     idServicios : this.formReprogramar.get('servicio').value,
    //     idConsultorios,
    //     _idHorario: idHorario,
    //     idSucursales: this.user.idSucursales,
    //     idMedico : this.formReprogramar.get('medico').value,
    //     idMascotas : this.infoCita.event.resizable.idMascotas
    // }

    setTimeout(() => {
      this.router.navigate([`/appointments/new-appoinment/${urlPartial}/${appoinment['idMascotas']}/${appoinment['idCitasMascotasActivas']}`])
      this._utilitiesService.closeLoader();
    }, 500);
  }
}
