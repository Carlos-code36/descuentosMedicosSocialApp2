import { Injectable } from '@angular/core';
import { DynamicClient } from './dynamicClient';

@Injectable({
  providedIn: 'root'
})
export class PublicationsService {

  constructor(
    private _dynamicClient: DynamicClient
  ) { }

  async getAllServices() {
    let temp = await this._dynamicClient.getRequest(`/serviciosmuni/0`).toPromise();
    return temp.body;
  }

  async getServiceByPlace(id_place, limit) {
    let temp = await this._dynamicClient.getRequest(`/serviciosmuni/${id_place}/${limit}`).toPromise();
    // console.log(temp['total']);
    // console.log(temp.body.length);
    // console.log(temp.body);

    return temp;
  }

  async getServiceById(id_service) {
    let temp = await this._dynamicClient.getRequest(`/servicio/${id_service}`).toPromise();
    return temp.body;
  }

  async getServicesByEmpresa(id_empresa){
    let temp = await this._dynamicClient.getRequest(`/serviciosactivosempresa/${id_empresa}`).toPromise();
    return temp.body;
  }

  async getSubServicio(id_subservicio){
    let temp = await this._dynamicClient.getRequest(`/subservicio/${id_subservicio}`).toPromise();
    return temp.body
  }

  async getMemberDataById(idMember: number) {
    let temp = await this._dynamicClient.getRequest(`/infouser/${idMember}/empresa`).toPromise();
    return temp.body;
  }

  async getBranchsByProvider(idProvider: number) {
    let temp = await this._dynamicClient.getRequest(`/sucursales/${idProvider}/0`).toPromise();
    return temp?.body || [];
  }

  async getDoctorsByProvider(idProvider: number) {
    let temp = await this._dynamicClient.getRequest(`/medicosactivosprov/${idProvider}`).toPromise();
    return temp.body;
  }
  //subservicio/id_subservicio
}
