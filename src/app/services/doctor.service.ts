import { Injectable } from '@angular/core';

import { SessionStorageService } from './session-storage.service';
import { DynamicClient } from './dynamicClient';
import { Globals } from '@app/globals';
import { UtilitiesService } from './utilities.service';


@Injectable({
  providedIn: 'root'
})
export class DoctorService {

  constructor(
    private _dynamicClient: DynamicClient,
    private _storageService: SessionStorageService,
    public _globals: Globals,
    private _utilitiesService: UtilitiesService,
  ) { }

  async getServicesDoctor(doctorId: number) {
    let services = await this._dynamicClient.getRequest(`/serviactivosmedi/${doctorId}`).toPromise();
    return services.body || null;
  }

  async getSchedulesDoctor(doctorId: number, serviceId: number, idEspecialidad: number) {
    if (idEspecialidad != 20) {
      let schedules = await this._dynamicClient.getRequest(`/citasactimedi/${doctorId}/${serviceId}/usuario`).toPromise();
      return schedules.body || null;
    }else{
      let schedules = await this._dynamicClient.getRequest(`/citasactimedi/${doctorId}/${serviceId}/mascota`).toPromise();
      return schedules.body || null;
    }
  }

  async getDataDoctor(doctorId: number | string) {
    let data = await this._dynamicClient.getRequest('/')
  }

  async getFullDataDoctor(doctorId): Promise<Array<any>> {
    return new Promise((resolve, reject) => {
      this.getServicesDoctor(doctorId).then(servs => {
        //console.log(servs);
        
        !servs.length && reject([]);

        servs.map(async serv => {
          serv.schedules = await this.getSchedulesDoctor(doctorId, serv.idSubServicios, serv.idEspecialidad);
          this._storageService.set('doctor_services', servs);
          return serv;
        });
        // console.log(servs);
        return resolve(servs);
      });
    })
  }

  async cancelAppointment(appointmentId: number, motivo) //cancelar cita
  {
    let data = {
      idCitaEnCurso: appointmentId,
      tabla: 'activa',
      cancelada:1,
      tipoCita: 'usuario',
      motivo: motivo
    }
    console.log(data);
    let res = await this._dynamicClient.postRequest('/cancelarcita', data).toPromise();
    res && this._utilitiesService.showToast(res.mensaje)
    console.log('cancelar cita', res);
    return res.ok;
  }

  // async reprogramAppointment(appointmentId: number) //reprogramar cita
  // { 
  //   let data = {
  //     idCitasmedicasactivas: appointmentId,
  //     fecha: "2020-05-05",
  //     hora: "10:00:00",
  //     quienSacoCita: this._globals.USER_OBJECT['idMembers'],
  //     idServicios: this._globals.USER_OBJECT['idServicios'],
  //     idConsultorios: this._globals.USER_OBJECT['idConsultorio'],
  //     _idHorario: this._globals.USER_OBJECT['idHorario'],
  //     idSucursales: this._globals.USER_OBJECT['idSucursal'],
  //     idMedico: this._globals.USER_OBJECT['idMedico']
  //   }
  //   console.log(data);
  //   // let res = await this._dynamicClient.postRequest('/reprogramarcita', data).toPromise();
  //   // return res.ok;
  // }
}
