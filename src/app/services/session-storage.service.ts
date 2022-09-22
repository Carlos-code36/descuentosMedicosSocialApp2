import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class SessionStorageService {

  singleParam: any;
  listParam: any[];

  constructor(private storage: Storage) {
    console.debug('%c Storage service file initialized', 'background: #222; color: #bada55');
  }

  public set(settingName: any, value: any) {
    this.storage.set(`setting:${settingName}`, value).then();
  }

  public async get(settingName: any) {
    await this.storage.ready();
    return await this.storage.get(`setting:${settingName}`);
  }

  public remove(settingName: any) {
    return this.storage.remove(`setting:${settingName}`);
  }

  public passParametersSingle(singleParam: any) {
    this.singleParam = singleParam;
  }

  public passParametersList(listParam: any) {
    this.listParam = listParam;
  }

  public async cleanAll() {
    await this.storage.clear();
  }
}
