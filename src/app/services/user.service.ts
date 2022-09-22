import { GlobalDataService } from './global-data.service';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Router } from '@angular/router';
import { Injectable, Injector } from '@angular/core';
import { throwError } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { DynamicClient } from './dynamicClient';

import { SessionStorageService } from './session-storage.service';
import { UtilitiesService } from './utilities.service';
import { environment } from 'src/environments/environment';
import { Globals } from '@app/globals';

const headers = new HttpHeaders();
headers.set('Content-Type', 'application/json');

const apiUrl = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class UserService {
  token: string;

  constructor(
    private _storageService: SessionStorageService,
    private _globalDataService: GlobalDataService,
    private _utilitiesService: UtilitiesService,
    private _dynamicClient: DynamicClient,
    private _globals: Globals,
    private _http: HttpClient,
    private router: Router,
  ) { }

  /**
   * Método para setear el usuario en storage
   * @param user Objeto tipo usuario
   */
  async setUserData(user: any) {
    this._globals.USER_OBJECT = user;
  }

  /**
   * Método para setear el menu del usuario en storage
   * @param menu Objeto con el menu del suuario
   */
  public setMenuUser(menu) {
    this._globals.USER_MENU = menu;
  }

  /**
   * Método para consultar y retornar la informacion de un usuario segun su id
   * @param idMember Id usuario a consultar
   */
  async getUserByID(idMember: number, typeUser: string = 'usuario') {
    let tmp = await this._dynamicClient.getRequest(`/infouser/${idMember}/${typeUser}`).toPromise();
    return tmp.body || null;
  }

  /**
   * Método para actualizar información de un usuario.
   * @param data Objeto con información del usuario a actualizar
   * @param userType Tipo de usuario
   * @returns Respuesta tipo boolean con `true` la actualización  fué satisfactoria, `false` de los contrario
   */
  public async updateUserData(data: Object, userType: string) {
    let tmpUser = await this._storageService.get('user');
    let temp = await this._dynamicClient.putRequest(`/perfil/${userType}`, data['userData']).toPromise();
    let images = [];

    data['images']['avatarProfile'] && images.push(this.savePhoto(data['images'], data['images']['avatarProfile'], 'profile'));
    data['images']['coverpageProfile'] && images.push(this.savePhoto(data['images'], data['images']['coverpageProfile'], 'coverpage'));
    
    if (temp?.ok) {
      Promise.all([...images]).then(() => {
        setTimeout(() => this.router.navigateByUrl('/', { replaceUrl: true }), 1000);
      }).catch()

      if (!data['images']['avatarProfile'] && !data['images']['coverpageProfile']) {
        this._storageService.set('user', temp.body);
        this._storageService.set('menu', temp.menu);
        this._storageService.set('tkn', temp.token);
        this._globalDataService.getUserLogged();

        setTimeout(() => this.router.navigate(['home']), 1000);
      }
    }
    return temp;
  }

  public async updateBeneficiary(data: Object, userType: string) {
    let temp = await this._dynamicClient.putRequest(`/perfil/usuario`, data['userData']).toPromise();
    let images = [];

    data['images']['avatarProfile'] && images.push(this.savePhoto(data['images'], data['images']['avatarProfile'], 'profile'));
    data['images']['coverpageProfile'] && images.push(this.savePhoto(data['images'], data['images']['coverpageProfile'], 'coverpage'));

    if (temp.ok) {
      Promise.all([...images]).then(() => {
        setTimeout(() => this.router.navigate(['/home/menu']), 1000);
      }).catch()
    }

    return temp;
  }

  public async updatePetBeneficiary(data: Object) {
    let temp = await this._dynamicClient.putRequest(`/mascota`, data['petData']).toPromise();
    let images = [];

    data['images']['avatarProfile'] && images.push(this.savePhoto(data['images'], data['images']['avatarProfile'], 'mascota', true));
    data['images']['coverpageProfile'] && images.push(this.savePhoto(data['images'], data['images']['coverpageProfile'], 'mascota_portada', true));

    if (temp.ok) {
      Promise.all([...images]).then(() => {
        setTimeout(() => this.router.navigate(['/home/menu']), 1000);
      }).catch()
    }

    return temp;
  }

  public async savePhoto(data: object, imageFile: string, type: string, isPet = false) {
    let nameImage = isPet ? `${type}_${data['idMascotas']}_${new Date().getTime()}.jpg` : `${type}_img_user_${data['idUsuarios']}_${new Date().getTime()}.jpg`;
    let endPointImage = isPet ? `avataruser/${data['idMascotas']}/${type}/1` : `avataruser/${data['idMembers']}/${type == 'profile' ? 'avatar' : 'portada'}/1`;

    this._utilitiesService.uploadImage(imageFile, nameImage, endPointImage).then();
  }

  public async setFavoritePhoto(photo) {
    let data = {
      idFotosperfil: photo.idFotosperfil,
      idMembers: photo.idMembers,
      tipo: photo.tipo
    }

    let temp = await this._dynamicClient.postRequest('/favorita', data).toPromise();
    temp.ok && this.getUserByID(this._globals.USER_ID, this._globals.USER_TYPE).then(data => {
      this._globals.USER_OBJECT = data;
      this.router.navigate(['/home/menu'])
    })
  }

  public async deletePhoto(photo) {
    let data = {
      idFotosperfil: photo.idFotosperfil,
      idMembers: photo.idMembers,
      favorita: photo.favorita,
      tipo: photo.tipo,
      path: photo.path
    }

    let temp = await this._dynamicClient.postRequest('/eliminaravatar', data).toPromise()
    temp.ok && this.getUserByID(this._globals.USER_ID, this._globals.USER_TYPE).then(data => {
      this._globals.USER_OBJECT = data;
      this.router.navigate(['/home/menu'])
    })
  }

  /**
   * Método para validar.
   * @param idMembers Id usuario.
   */
  public async updateValidateData(idMembers) {
    let temp = await this._dynamicClient.postRequest(`/validada/${idMembers}`).toPromise();
    let tmpUser = await this._storageService.get('user');

    tmpUser.validada = 1;
    temp.ok && this.getUserByID(this._globals.USER_ID, this._globals.USER_TYPE).then(() => this.router.navigate(['/home/profile']))
  }

  /**
   * Método para subir imagen del avatar del usuario.
   * @param imageFile Imagen para subir.
   * @param idUser Id del usuario.
   */
  public updateAvatarUser(imageFile, idUser: number) {

    let tmpHeader = new HttpHeaders().set('Content-Type', 'multipart/form-data');
    let formData = new FormData()
    formData.append('imagen', imageFile, imageFile.name);

    return this._http.put(`${apiUrl}/avataruser/${idUser}/usuario`, formData, { headers: tmpHeader })
      .map(res => {
        console.log(res);
      })
      .catch(err => {

        this._utilitiesService.showModalTemplate('Error', err.error.mensaje)
        return throwError(err);
      });
  }

  /**
   * Método para enviar peticiones de medicamentos.
   * 
   */
  public sendMedicamentRequest(data: Object) {
    return this._http.post(`${apiUrl}/recormedicamento`, data, { headers}).map(res => {
      // console.log(res);
    })
    .catch(err => {
        
        this._utilitiesService.showModalTemplate('Error', err.error.mensaje)
        return throwError(err);
      });
  }

  /**
   * Método para llamar peticiones de medicamentos.
   * 
   */
  public getMedicamentRequest(idMembers: number) {
    return this._http.get(`${apiUrl}/recormedicamento/${idMembers}`).map((res:any) => {
      console.log(res);
      return res.body;
    })
    .catch(err => {
        
        this._utilitiesService.showModalTemplate('Aquiiiiiiiiiii', err.error.mensaje)
        return throwError(err);
      });
  }
}