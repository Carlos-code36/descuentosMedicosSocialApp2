import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { of, throwError } from "rxjs";

import { UtilitiesService } from "./utilities.service";

import { environment } from 'src/environments/environment';
import { catchError, timeout } from "rxjs/operators";

const headers = new HttpHeaders().set('Content-Type', 'application/json').set('Content-Type', 'application/json');
const apiUrl = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class DynamicClient {
  constructor(
    private http: HttpClient,
    private _utilitiesService: UtilitiesService
  ) { }

  /**
   * Método reutilizable tipo GET
   * @param partialEndPoint Cadena tipo string con el endpoint a realizar la solicitud
   */
  public getRequest(partialEndPoint: string) {
    return this.http.get(apiUrl + partialEndPoint, { headers })
      .pipe(
        timeout(3000),
        catchError(e => {
          return of(null);
        })
      )
      .map((res: any) => {
        if (!res.ok) {
          this._utilitiesService.showInfoDialog('Oppps', res.mensaje);
          return;
        }

        return res;
      })
      .catch(err => {
        this._utilitiesService.showInfoDialog('Oppps', err.error?.mensaje || 'Sentimos las molestias, en el momento no se puede procesar la solicitud, intentalo de nuevo.');
        return throwError(err.error.mensaje);
      });
  }

  /**
   * Método reutilizable tipo POST
   * @param partialEndPoint Cadena tipo string con el endpoint a realizar la solicitud
   */
  public postRequest(partialEndPoint: string, data?: any) {    
    return this.http.post(apiUrl + partialEndPoint, data, { headers })
      .pipe(
        timeout(10000),
        catchError(e => {
          return of(e.error);
        })
      )
      .map((res: any) => {
        if (!res.ok) {
          this._utilitiesService.showInfoDialog('Oppps', res.mensaje);
          return;
        }

        return res;
      })
      .catch(err => {
        this._utilitiesService.showInfoDialog('Oppps', err.error?.mensaje || 'Sentimos las molestias, algo ha salido mal, intentalo de nuevo.');
        return throwError(err.error.mensaje);
      });
  }

  /**
   * Método reutilizable tipo PUT
   * @param partialEndPoint Cadena tipo string con el endpoint a realizar la solicitud
   */
  public putRequest(partialEndPoint: string, data?: any) {
    return this.http.put(apiUrl + partialEndPoint, data, { headers })
      .pipe(timeout(10000), catchError(e =>  of(e.error)))
      .map((res: any) => {
        if (!res.ok) {
          this._utilitiesService.showInfoDialog('Oppps', res.mensaje);
          return;
        }

        this._utilitiesService.showToast(res.mensaje, 4000);
        return res;
      })
      .catch(err => {
        this._utilitiesService.showInfoDialog('Oppps', 'Sentimos las molestias, algo ha salido mal, intentalo de nuevo.');
        return throwError(err);
      });
  }
}