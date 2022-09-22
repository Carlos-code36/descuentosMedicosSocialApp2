import { Injectable } from '@angular/core';

import { Globals } from '@app/globals';
import { AuthService } from './auth.service';
import { DynamicClient } from './dynamicClient';

@Injectable({
  providedIn: 'root'
})
export class GlobalDataService {
  constructor(
    private _globals: Globals,
    private _authService: AuthService,
    private _dynamicClient: DynamicClient
  ) {
    console.debug('%c Global service', 'background: #222; color: #bada55');
  }

  /**
   * Método para sincronizar diferentes listas de datos necesarios para la app.
   */
  async syncronizeAllData() {
    this._globals.loadData()
      .then(() => {
        !this._globals.HOLIDAYS && this.getHolidays();
        !this._globals.USER_ID && this.getUserLogged();
        !this._globals.DEPARTMENTSANDMUNI && this.getDepartmentsAndMunic();
        !this._globals.SPECIALITIES && this.getSpecialities();
        !this._globals.CIVILSTATUS && this.getCivilStatus();
        !this._globals.RELATIONSHIPS && this.getRelationship();
        !this._globals.DOCUMENTYPES && this.getDocumentTypes();
        !this._globals.NOTIFICATIONS && this.getNotifications();
        !this._globals.BENEFICIARIES && this.getBeneficiaries(this._globals.USER_ID);
        this.getVersionAppPlayStore();
      });
    // await this.getMenuUser();
    // await this.getUserLoged();
  }

  /* ***************************************** */
  /*                Get Methods                */
  /* ***************************************** */

  public async getUserLogged(force?: boolean) {
    if (!await this._authService.isLogged() && !force) return

    let currentUser = this._globals.USER_ID || this._globals.USER_OBJECT['idMembers'] || undefined;
    let userType = this._globals.USER_OBJECT['tipoCuenta'];
    let temp = await this._dynamicClient.getRequest(`/infouser/${currentUser}/${userType}`).toPromise();

    this._globals.USER_TOKEN = temp.token
    this._globals.USER_OBJECT = temp.body;
    this._globals.USER_MENU = [...temp.menu].find(e => e.plataforma == 'APP_MOVIL').menu;
    this._globals.NOTIFICATIONS = temp?.notifications || [];
    this._globals.USERNAME = `${temp.body['nombres'].getFirstWord()} ${temp.body['apellidos'].getFirstWord()}`
    this._globals.USERMAIL = temp.body['correo'];

    // this.getBeneficiaries();
  }

  public async getHolidays() {
    let temp = await this._dynamicClient.getRequest('/info/festivos/47').toPromise();
    this._globals.HOLIDAYS = temp.body;
  }

  public async getDepartments() {
    let temp = await this._dynamicClient.getRequest('/location/departamentos').toPromise();
    this._globals.DEPARTMENTS = temp.body;
  }

  public async getDepartmentsAndMunic() {
    let temp = await this._dynamicClient.getRequest('/location/depasmunis').toPromise();
    this._globals.DEPARTMENTSANDMUNI = temp.body;
  }

  public async getSpecialities() {
    let temp = await this._dynamicClient.getRequest('/especialidades').toPromise();
    this._globals.SPECIALITIES = temp.body;
  }

  public async getCivilStatus() {
    let temp = await this._dynamicClient.getRequest('/info/estadoscivil').toPromise();
    this._globals.CIVILSTATUS = temp.body;
  }

  public async getDocumentTypes() {
    let temp = await this._dynamicClient.getRequest('/info/tiposdocumentos').toPromise();
    this._globals.DOCUMENTYPES = temp.body;
  }

  public async getRelationship() {
    let temp = await this._dynamicClient.getRequest('/info/parentescos').toPromise();
    this._globals.RELATIONSHIPS = temp.body;
  }

  public async getNotifications() {
    let temp = await this._dynamicClient.getRequest('/notifications').toPromise();
    this._globals.NOTIFICATIONS = temp?.body || [];
  }

  public async getBeneficiaries(memberId = this._globals.USER_ID) {
    let groups = await this.getGroupsForMember(memberId);
    //console.log(groups);
    
    if (groups.length == 0) {
      this._globals.GROUP = undefined;
      this._globals.BENEFICIARIES = [];
      this._globals.PETS = [];
    }

    this._globals.GROUP = groups[0];

    setTimeout(async () => {
      let { beneficiaries, pets } = await this.getDataGroup(groups[0]?.idGrupos);
      //console.log(beneficiaries);
      this._globals.BENEFICIARIES = beneficiaries;
      this._globals.PETS = pets;
    }, 500);
  }

  public async getGroupsForMember(memberId) {
    let temp = await this._dynamicClient.getRequest(`/gruposfamiliares/${memberId}`).toPromise();
    return temp.body;
  }

  public async getDataGroup(groupId) {
    let temp = await this._dynamicClient.getRequest(`/gruposfamiliaresinfo/${groupId}`).toPromise();
    let { beneficiarios: beneficiaries = [], mascotas: pets = [] } = temp.body;
    return temp.ok && { beneficiaries, pets };
  }

  public async getVersionAppPlayStore() {
    let temp = await this._dynamicClient.getRequest('/versionapp').toPromise();
    console.log(temp);
    
    this._globals.VERSIONPLAY = temp.body.currentVersion;
    return temp.body.currentVersion;
  }

  /**
   * Método para filtrar Municipios y ciudades por departamento.
   * @param idDepartment Id de departamento para filtrar.
   */
  async getTownForId(idDepartment: number) {
    await this._dynamicClient.getRequest(`/municipios/${idDepartment}`).toPromise();
  }
}


