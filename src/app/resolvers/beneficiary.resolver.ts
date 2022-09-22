import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { of, Observable } from "rxjs";

import { DynamicClient } from "@app/services/dynamicClient";
import { UtilitiesService } from "@app/services";

@Injectable({
  providedIn: 'root'
})
export class BeneficiaryResolver implements Resolve<Observable<any>> {

  constructor(
    private _dynamicClient: DynamicClient,
    private _utilitiesService: UtilitiesService
  ) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {

    return of('');
    this._utilitiesService.showInfoDialog('Oppps', 'Lo sentimos, ha ocurrido un error obteniendo los beneficiarios...');
    return of('hola');
  }

}