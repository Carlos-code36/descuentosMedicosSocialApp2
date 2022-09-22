import { Injectable } from '@angular/core';
import { DynamicClient } from './dynamicClient';

@Injectable({
  providedIn: 'root'
})
export class PromotionsService {

  constructor(
    private _dynamicClient: DynamicClient
  ) { }

  async getAllServices() {
    let temp = await this._dynamicClient.getRequest(`/serviciosmuni/0`).toPromise();
    return temp.body;
  }

  async getPromotionByPlace(id_place) {
    let temp = await this._dynamicClient.getRequest(`/promocionesmuni/${id_place}`).toPromise();
    return temp.body;
  }

  async getPromotionId(id_promocion) {
    let temp = await this._dynamicClient.getRequest(`/promocion/${id_promocion}`).toPromise();
    return temp.body;
  }

  async getMemberDataById(idMember: number) {
    let temp = await this._dynamicClient.getRequest(`/infouser/${idMember}/empresa`).toPromise();
    return temp.body;
  }

  async getBranchsByProvider(idProvider: number) {
    let temp = await this._dynamicClient.getRequest(`/sucursales/${idProvider}`).toPromise();
    return temp?.body || [];
  }

  async getDoctorsByProvider(idProvider: number) {
    let temp = await this._dynamicClient.getRequest(`/medicosactivosprov/${idProvider}`).toPromise();
    return temp.body;
  }
}
