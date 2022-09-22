import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { environment } from 'src/environments/environment';
import { UtilitiesService } from './utilities.service';
import { DynamicClient } from './dynamicClient';

const headers = new HttpHeaders();
headers.set('Content-Type', 'application/json');

const apiUrl = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(
    private _http: HttpClient,
    private _dynamicClient: DynamicClient,
    private _utilitiesService: UtilitiesService,
  ) { }

  async getDocumentsType() {
    let documentTypes = await this._dynamicClient.getRequest('/info/tiposdocumentos').toPromise();
    return documentTypes;

    return this._http.get(apiUrl + '/info/tiposdocumentos', { headers })
      .map((res: any) => {
        if (!res.ok) {
          this._utilitiesService.showToast(res.mensaje, 3000);
          return;
        }

        return res.body;
      })
      .catch(err => {
        this._utilitiesService.showToast('Sentimos las molestias, algo ha salido mal, intentalo de nuevo.');
        return throwError(err);
      });
  }

  /**
   * Método para obtener una coleccion de departamentos
   */
  getDepartments() {
    return this._http.get(apiUrl + '/location/departamentos', { headers })
      .map((res: any) => {
        if (!res.ok) {
          this._utilitiesService.showToast(res.mensaje, 3000);
          return;
        }

        return res.body;
      })
      .catch(err => {
        this._utilitiesService.showToast('Sentimos las molestias, algo ha salido mal, intentalo de nuevo.');
        return throwError(err);
      });
  }

  /**
   * Método para filtrar Municipios y ciudades por departamento.
   * @param idDepartment Id de departamento para filtrar.
   */
  getTownForId(idDepartment: number) {
    this._http.get(apiUrl + '/municipios/' + idDepartment, { headers })
      .map((res: any) => {
        if (!res.ok) {
          this._utilitiesService.showModalTemplate('Oppps', res.mensaje);
          return;
        }

        console.log(res);

        return true;
      })
      .catch(err => {
        this._utilitiesService.showModalTemplate('Oppps', 'Sentimos las molestias, algo ha salido mal, intentalo de nuevo.');
        return throwError(err);
      });
  }

  /**
   * Método que retorna una coleccion de departamentos y municipios.
   */
  getDeptAndTown() {
    return this._http.get(apiUrl + '/location/depasmunis', { headers })
      .map((res: any) => {
        if (!res.ok) {
          this._utilitiesService.showToast(res.mensaje, 3000);
          return;
        }

        return res.body;
      })
      .catch(err => {
        this._utilitiesService.showToast('Sentimos las molestias, algo ha salido mal, intentalo de nuevo.');
        return throwError(err);
      });
  }

  getCivilStatus() {
    return this._http.get(apiUrl + '/info/estadoscivil', { headers })
      .map((res: any) => {
        if (!res.ok) {
          this._utilitiesService.showToast(res.mensaje, 3000);
          return;
        }

        return res.body;
      })
      .catch(err => {
        this._utilitiesService.showToast('Sentimos las molestias, algo ha salido mal, intentalo de nuevo.');
        return throwError(err);
      });
  }

  getRelationship() {
    return this._http.get(apiUrl + '/info/parentescos', { headers })
      .map((res: any) => {
        if (!res.ok) {
          this._utilitiesService.showToast(res.mensaje, 3000);
          return;
        }

        return res.body;
      })
      .catch(err => {
        this._utilitiesService.showToast('Sentimos las molestias, algo ha salido mal, intentalo de nuevo.');
        return throwError(err);
      });
  }

  getHolidays() {
    return this._http.get(apiUrl + '/info/festivos/47', { headers })
      .map((res: any) => {
        if (!res.ok) {
          this._utilitiesService.showToast(res.mensaje, 3000);
          return;
        }

        return res.body;
      })
      .catch(err => {
        this._utilitiesService.showToast('Sentimos las molestias, algo ha salido mal, intentalo de nuevo.');
        return throwError(err);
      });
  }
}
