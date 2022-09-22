import { Injectable } from '@angular/core';

import { SessionStorageService } from './services/session-storage.service';

@Injectable()
export class Globals {
  private _PUSHNOTIFICATIONSID: string = undefined;
  private _DEPARTMENTSANDMUNI: Array<any> = undefined;
  private _MUNICIPALITIES: Array<any> = undefined;
  private _DEPARTMENTS: Array<any> = undefined;
  private _RELATIONSHIPS: Array<any> = undefined;
  private _DOCUMENTYPES: Array<any> = undefined;
  private _SPECIALITIES: Array<any> = undefined;
  private _CIVILSTATUS: Array<any> = undefined;
  private _HOLIDAYS: Array<any> = undefined;

  private _USER_ID: number = undefined;
  private _USER_TYPE: string = undefined;
  private _USER_TOKEN: string = undefined;
  private _USER_OBJECT: any = undefined;
  private _USERPROFILE: string = undefined;
  private _USER_MENU: any = undefined;
  private _USERNAME: string = undefined;
  private _USERMAIL: string = undefined;
  private _USERTEL: string = undefined;
  private _BENEFICIARIES: Array<any> = undefined;
  private _PETS: Array<any> = undefined;
  private _GROUP: any = undefined;
  private _VERSIONAPP: string = undefined;
  private _VERSIONPLAY: string = undefined;

  private _HISTORYSEARCH: Array<any> = undefined;

  // private _USER_NOTIFICATIONS: Array<any> = undefined;
  // private _GLOBAL_NOTIFICATIONS: Array<any> = undefined;

  private _NOTIFICATIONS: Array<any> = undefined;

  private _PERSON_AVATAR_DEFAULT: string = 'avatarundefined.png';
  private _PET_AVATAR_DEFAULT: string = 'avatarmascotas.png';

  constructor(
    private _storageService: SessionStorageService
  ) {
    console.debug(`%c Global data file initialized, user: ${this.USER_OBJECT}`, 'background: #222; color: #bada55');
  }

  public async loadData() {
    console.debug(`%c Load data on globals`, 'background: #222; color: #9b59b6');

    return Promise.all([
      this._storageService.get('departmentsandmuni'),
      this._storageService.get('municipalities'),
      this._storageService.get('departments'),
      this._storageService.get('relationships'),
      this._storageService.get('documentypes'),
      this._storageService.get('specialities'),
      this._storageService.get('civilstatus'),
      this._storageService.get('holidays'),
      this._storageService.get('userid'),
      this._storageService.get('usertype'),
      this._storageService.get('user'),
      this._storageService.get('userprofile'),
      this._storageService.get('menu'),
      this._storageService.get('username'),
      this._storageService.get('usermail'),
      this._storageService.get('usertel'),
      this._storageService.get('notifications'),
      this._storageService.get('pushnotificationsid'),
      this._storageService.get('beneficiaries'),
      this._storageService.get('pets'),
      this._storageService.get('versionapp'),
      this._storageService.get('versionplay'),
      this._storageService.get('historysearch')
      // this._storageService.get('user_notifications'),
      // this._storageService.get('global_notifications')
    ]).then(values => {
      this._DEPARTMENTSANDMUNI = values[0]
      this._MUNICIPALITIES = values[1]
      this._DEPARTMENTS = values[2]
      this._RELATIONSHIPS = values[3]
      this._DOCUMENTYPES = values[4]
      this._SPECIALITIES = values[5]
      this._CIVILSTATUS = values[6]
      this._HOLIDAYS = values[7]
      this._USER_ID = values[8]
      this._USER_TYPE = values[9]
      this._USER_OBJECT = values[10]
      this._USERPROFILE = values[11]
      this._USER_MENU = values[12]
      this._USERNAME = values[13]
      this._USERMAIL = values[14]
      this._USERTEL = values[15]
      this._NOTIFICATIONS = values[16] || []
      this._PUSHNOTIFICATIONSID = values[17]
      this._BENEFICIARIES = values[18]
      this._PETS = values[19]
      this._VERSIONAPP = values[20]
      this._VERSIONPLAY = values[21]
      this._HISTORYSEARCH = values[22]
      // this._USER_NOTIFICATIONS = values[14] || []
      // this._GLOBAL_NOTIFICATIONS = values[15] || []
    }).catch(err => {
      console.log(err);
    })
  }

  /* **************************************** */
  /* ***          GETTER METHODS          *** */
  /* **************************************** */
  public get VERSIONAPP(): string {
    return this._VERSIONAPP;
  }

  public get VERSIONPLAY(): string {
    return this._VERSIONPLAY;
  }

  public get PUSHNOTIFICATIONSID(): string {
    return this._PUSHNOTIFICATIONSID;
  }

  public get DEPARTMENTSANDMUNI(): Array<any> {
    return this.orderAscendent(this._DEPARTMENTSANDMUNI, 'nombreMunicipio');
  }

  public get MUNICIPALITIES(): Array<any> {
    return this._MUNICIPALITIES;
  }

  public get DEPARTMENTS(): Array<any> {
    return this._DEPARTMENTS;
  }

  public get RELATIONSHIPS(): Array<any> {
    return this._RELATIONSHIPS;
  }

  public get DOCUMENTYPES(): Array<any> {
    return this._DOCUMENTYPES;
  }

  public get SPECIALITIES(): Array<any> {
    return this._SPECIALITIES;
  }

  public get CIVILSTATUS(): Array<any> {
    return this._CIVILSTATUS;
  }

  public get HOLIDAYS(): Array<any> {
    return this._HOLIDAYS;
  }

  public get USER_ID(): number {
    return this._USER_ID;
  }
  public get USER_TYPE(): string {
    return this._USER_TYPE;
  }

  public get USER_TOKEN(): string {
    return this._USER_TOKEN;
  }

  public get USER_OBJECT(): any {
    return this._USER_OBJECT;
  }

  public get USER_MENU(): any {
    return this._USER_MENU;
  }

  public get USERNAME(): string {
    return this._USERNAME;
  }

  public get USERMAIL(): string {
    return this._USERMAIL;
  }

  public get USERTEL(): string {
    return this._USERTEL;
  }

  public get USERPROFILE(): string {
    return this._USERPROFILE;
  }

  // public get USER_NOTIFICATIONS(): Array<any> {
  //   return this._USER_NOTIFICATIONS;
  // }

  public get PERSON_AVATAR_DEFAULT(): string {
    return this._PERSON_AVATAR_DEFAULT;
  }

  public get PET_AVATAR_DEFAULT(): string {
    return this._PET_AVATAR_DEFAULT;
  }

  public get NOTIFICATIONS(): Array<any> {
    return this._NOTIFICATIONS;
  }

  public get BENEFICIARIES(): Array<any> {
    return this._BENEFICIARIES;
  }

  public get PETS(): Array<any> {
    return this._PETS;
  }

  public get GROUP(): any {
    return this._GROUP;
  }

  public get HISTORYSEARCH(): Array<any> {
    return this._HISTORYSEARCH;
  }

  // public get GLOBAL_NOTIFICATIONS(): Array<any> {
  //   return this._GLOBAL_NOTIFICATIONS;
  // }

  /* **************************************** */
  /* ***          SETTER METHODS          *** */
  /* **************************************** */
  public set VERSIONAPP(value: string) {
    this._storageService.set('versionapp', value);
    this._VERSIONAPP = value;
  }

  public set VERSIONPLAY(value: string) {
    this._storageService.set('versionplay', value);
    this._VERSIONPLAY = value;
  }

  public set PUSHNOTIFICATIONSID(value: string) {
    this._storageService.set('pushnotificationsid', value);
    this._PUSHNOTIFICATIONSID = value;
  }

  public set DEPARTMENTSANDMUNI(value: Array<any>) {
    this._storageService.set('departmentsandmuni', value);
    this._DEPARTMENTSANDMUNI = value;
  }

  public set MUNICIPALITIES(value: Array<any>) {
    this._storageService.set('municipalities', value);
    this._MUNICIPALITIES = value;
  }

  public set DEPARTMENTS(value: Array<any>) {
    this._storageService.set('departments', value);
    this._DEPARTMENTS = value;
  }

  public set RELATIONSHIPS(value: Array<any>) {
    this._storageService.set('relationships', value);
    this._RELATIONSHIPS = value;
  }

  public set DOCUMENTYPES(value: Array<any>) {
    this._storageService.set('documentypes', value);
    this._DOCUMENTYPES = value;
  }

  public set SPECIALITIES(value: Array<any>) {
    this._storageService.set('specialities', value);
    this._SPECIALITIES = value;
  }

  public set CIVILSTATUS(value: Array<any>) {
    this._storageService.set('civilstatus', value);
    this._CIVILSTATUS = value;
  }

  public set HOLIDAYS(value: Array<any>) {
    this._storageService.set('holidays', value);
    this._HOLIDAYS = value;
  }

  public set USER_ID(value: number) {
    this._storageService.set('userid', value);
    this._USER_ID = value;
  }

  public set USER_TYPE(value: string) {
    this._storageService.set('usertype', value);
    this._USER_TYPE = value;
  }

  public set USER_TOKEN(value: string) {
    this._storageService.set('tkn', value);
    this._USER_TOKEN = value;
  }

  public set USER_OBJECT(value: any) {
    this._storageService.set('user', value);

    this._USER_OBJECT = value;
    this.USERNAME = `${value['nombres'].getFirstWord()} ${value['apellidos'].getFirstWord()}`;
    this.USERMAIL = value['correo'];
    this.USERTEL = value['telefono'];
    this.USER_ID = value['idMembers'];
    this.USER_TYPE = value['tipoCuenta'];
  }

  public set USER_MENU(value: any) {
    this._storageService.set('menu', value);
    this._USER_MENU = value;
  }

  public set USERNAME(value: string) {
    this._storageService.set('username', value);
    this._USERNAME = value;
  }

  public set USERMAIL(value: string) {
    this._storageService.set('usermail', value);
    this._USERMAIL = value;
  }

  public set USERTEL(value: string) {
    this._storageService.set('usertel', value);
    this._USERTEL = value;
  }

  public set USERPROFILE(value: string) {
    this._storageService.set('userprofile', value);
    this._USERPROFILE = value;
  }

  // public set USER_NOTIFICATIONS(value: Array<any>) {
  //   this._storageService.set('user_notifications', value);
  //   this._USER_NOTIFICATIONS = value;
  // }

  public set PERSON_AVATAR_DEFAULT(value: string) {
    this._PERSON_AVATAR_DEFAULT = value;
  }

  public set PET_AVATAR_DEFAULT(value: string) {
    this._PET_AVATAR_DEFAULT = value;
  }

  public set NOTIFICATIONS(value: Array<any>) {
    this._storageService.set('notifications', value);
    this._NOTIFICATIONS = value;
  }

  public set BENEFICIARIES(value: Array<any>) {
    this._storageService.set('beneficiaries', value);
    this._BENEFICIARIES = value;
  }

  public set PETS(value: Array<any>) {
    this._storageService.set('pets', value);
    this._PETS = value;
  }

  public set GROUP(value: any) {
    this._storageService.set('group', value);
    this._GROUP = value;
  }

  public set HISTORYSEARCH(value: Array<any>) {
    this._storageService.set('historysearch', value);
    this._HISTORYSEARCH = value;
  }

  // public set GLOBAL_NOTIFICATIONS(value: Array<any>) {
  //   this._storageService.set('global_notifications', value);
  //   this._USER_NOTIFICATIONS = value;
  // }

  public getNameDepartmentsAndTownsById(idDepartment) {
    return this._DEPARTMENTSANDMUNI.find(e => e.idmunicipio == idDepartment);
  }

  orderAscendent(list: Array<any>, parameterOrder: string) {
    list?.sort((a: Object, b: Object) => {
      if (a[parameterOrder] > b[parameterOrder]) return 1;
      if (a[parameterOrder] < b[parameterOrder]) return -1;
      return 0;
    });

    return list || undefined;
  }
}