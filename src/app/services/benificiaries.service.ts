import { DynamicClient } from './dynamicClient';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { throwError } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { environment } from 'src/environments/environment';
import { UtilitiesService } from '@services/utilities.service';
import { Router } from '@angular/router';
import { Globals } from '@app/globals';

const headers = new HttpHeaders();
headers.set('Content-Type', 'application/json');

const apiUrl = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class BeneficiariesService {

  constructor(
    private router: Router,
    private _http: HttpClient,
    private _dynamicClient: DynamicClient,
    private _utilitiesService: UtilitiesService,
  ) { }

  getGroupsForMember(memberId) {

    return this._http.get(apiUrl + `/gruposfamiliares/${memberId}`, { headers })
      .map((res: any) => {

        if (!res.ok) {
          this._utilitiesService.showModalTemplate('Oppps', res.mensaje);
          return;
        }

        res.body.map(rs => {
          rs.avatar = `${apiUrl}/avatar/${rs.avatar}`
        })

        return res.body[0]
      })
      .catch(err => {
        this._utilitiesService.closeLoader();

        this._utilitiesService.showModalTemplate('Oppps', 'Sentimos las molestias, algo ha salido mal, intentalo de nuevo.');
        // this._utilitiesService.showModalTemplate('Error', err.error.mensaje)
        return throwError(err);
      });
  }

  getDataGroup(groupId) {

    return this._http.get(apiUrl + `/gruposfamiliaresinfo/${groupId}`, { headers })
      .map((res: any) => {
        this._utilitiesService.closeLoader();

        if (!res.ok) {
          this._utilitiesService.showModalTemplate('Oppps', res.mensaje);
          return;
        }

        return res.body[0]
      })
      .catch(err => {
        this._utilitiesService.closeLoader();

        this._utilitiesService.showModalTemplate('Oppps', 'Sentimos las molestias, algo ha salido mal, intentalo de nuevo.');
        // this._utilitiesService.showModalTemplate('Error', err.error.mensaje)
        return throwError(err);
      });
  }

  getBeneficiariesGroupByMember(idMember) {
    return this._http.get(apiUrl + `/citagruposfamiliares/${idMember}`, { headers })
      .map((res: any) => {
        this._utilitiesService.closeLoader();

        if (!res.ok) {
          this._utilitiesService.showModalTemplate('Oppps', res.mensaje);
          return;
        }

        return res.body
      })
      .catch(err => {
        this._utilitiesService.closeLoader();

        this._utilitiesService.showModalTemplate('Oppps', 'Sentimos las molestias, algo ha salido mal, intentalo de nuevo.');
        // this._utilitiesService.showModalTemplate('Error', err.error.mensaje)
        return throwError(err);
      });
  }

  public async createGroup(data, isPet = false) {
    let res = await this._dynamicClient.postRequest('/beneficiarios', data.group).toPromise();

    if (res.ok) {
      let nameImage = `profile_img_beneficiary_${res.body.idUsuarios}_${new Date().getTime()}.jpg`;
      let endPointProfile = `avataruser/${res.body.idMembers}/avatar/1`;

      let nameImagePet = `mascota_${res.body.idMascotas}_${new Date().getTime()}.jpg`;
      let endPointProfilePet = `avataruser/${res.body}/mascota/1`;

      if (data.avatar) {
        this._utilitiesService.uploadImage(data.avatar, isPet?nameImagePet:nameImage, isPet?endPointProfilePet:endPointProfile).then(() => {
          this._utilitiesService.showToast(res.mensaje, 3000);
          this.router.navigate(['/home/publications']);
        });
      } else {
        this._utilitiesService.showToast(res.mensaje, 3000);
        this.router.navigate(['/home/publications']);
      }
    }
  }
  
  /**
   * pedir permiso para agreagar beneficiarios a un grupo
   */

  async pedirPermiso() 
  {
    let data = {
    }
    console.log(data);
    let temp = await this._dynamicClient.postRequest('', data).toPromise();
    // temp && this._utilitiesService.showToast(temp.mensaje);
    }

}
