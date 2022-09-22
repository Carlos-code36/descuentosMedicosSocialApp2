import { Injectable } from '@angular/core';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { DynamicClient } from './dynamicClient';
import { environment } from 'src/environments/environment';

import { UtilitiesService } from './utilities.service';
import { Router } from '@angular/router';
const apiUrl = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class AppointmentsService {

  constructor(
    private _dynamicClient: DynamicClient,
    private _utilitiesService: UtilitiesService,
    private router: Router
  ) { }

  /**
   * Método que consulta en la api las sucursales activas pertenecientes a un servicio segun su municipio y empresa.
   * @param municipality Identificador tipo numerico del municipio a consultar.
   * @param service Identificador tipo numerico del servicio a consultar.
   * @param company Identificador tipo numerico de la empresa a consultar.
   */
  public async getBranchsService(municipality: number, subService: number, company: number) {
    let temp = await this._dynamicClient.getRequest(`/sucursalesactivas/${municipality}/${subService}/${company}`).toPromise();
    return temp.body;
  }

  /**
   * Método que consulta en la api los médicos disponibles en una sucursal segun su municipio y el servicio.
   * @param service Identificador tipo numerico del servicio a consultar.
   * @param municipality Identificador tipo numerico del municipio a consultar.
   * @param branch Identificador tipo numerico de la sucursal a consultar.
   */
  async getDoctorsBranch(subservice, municipality, branch) {
    let temp = await this._dynamicClient.getRequest(`/medicosactivos/${subservice}/${municipality}/${branch}`).toPromise();
    return temp.body;
  }

  /**
   * Método que consulta en la api los horarios disponibles de un médico segun una fecha, sucursal y servicio dados.
   * @param date Fecha a consultar con formato(año-mes-dia) ej. 2020-11-20.
   * @param branch Identificador tipo numerico de la sucursal a consultar.
   * @param service Identificador tipo numerico del servicio a consultar.
   * @param doctor Identificador tipo numerico del médico a consultar.
   */
  async getScheduleDoctor(date, branch, doctor, idsubservicio) {
    let temp = await this._dynamicClient.getRequest(`/horario/${date}/${branch}/${doctor}/${idsubservicio}`).toPromise();
    return temp.body;
  }

  /**
   * Método para sacar una cita.
   * @param data Datos generados para sacar la cita.
   */
  async setAppointment(data, pet) {
    let temp = await this._dynamicClient.postRequest(pet ? '/sacarcitamascota' : '/sacarcita', data).toPromise();
    temp && this._utilitiesService.showToast(temp.mensaje);

    return temp.ok;
  }

  /**
   * Método para reprogramar una cita.
   * @param data Datos para reprogramar una cita.
   */
  async reprogramAppointment(data, isPet = false) {
    if (isPet) return await this._dynamicClient.putRequest('/reprogramarcitamascota', data).toPromise();
    if (!isPet) return await this._dynamicClient.putRequest('/reprogramarcita', data).toPromise();
  }

  /**
   * Método para obtener la lista de citas activas de un usuario.
   * @param idMember Id member.
   */
  async getAppoinmentsActive(idMember) {
    let temp = await this._dynamicClient.getRequest(`/citasactivasapp/${idMember}`).toPromise();
    return temp.body;
  }

  /**
   * Método para obtener la lista de citas activas de las mascotas de un usuario.
   * @param idMember Id member.
   */
  async getPetAppoinmentsActive(idMember) {
    let temp = await this._dynamicClient.getRequest(`/citasmascotasapp/${idMember}`).toPromise();
    return temp.body;
  }

  /**
   * Método para obtener la lista de citas activas de los beneficiarios de un usuario.
   * @param idMember Id member.
   */
  async getAppoinmentsActiveBeneficiary(idMember) {
    let temp = await this._dynamicClient.getRequest(`/citasactivasbenesapp/${idMember}`).toPromise();
    return temp?.body[0]?.beneficiarios;
  }

  /**
   * Método para cancelar una cita
   * @param idCita Id cita a cancelar
   */
  async cancelAppointment(idCita, type = 'usuario') {
    let data = {
      cancelada: 1,
      motivo: "Cita cancelada por el usuario.",
      tabla: "activa",
      tipoCita: type,
      idCitaEnCurso: idCita
    }
    console.log(data);
    

    let temp = await this._dynamicClient.postRequest('/cancelarcita', data).toPromise();
    temp && this._utilitiesService.showToast(temp.mensaje);

    this.router.navigate(['/home/menu']);
    return temp.ok;
  }
  
  async confirmAppointment(idCita, stado) {
    let data = {
      estado: stado,
      idCitasmedicasactivas: idCita,
      motivo: "Cita confirmada por el usuario.",
    }
    console.log(data);
    let temp = await this._dynamicClient.postRequest('/confirmarcita', data).toPromise();
    temp && this._utilitiesService.showToast(temp.mensaje);
  }


  async getAppoinmentsHistory(idMember, isPet = false) {
    let temp = await this._dynamicClient.getRequest(`/${isPet?'historialmascotasapp':'historialcitasapp'}/${idMember}`).toPromise();
    return temp.body;
  }
}
