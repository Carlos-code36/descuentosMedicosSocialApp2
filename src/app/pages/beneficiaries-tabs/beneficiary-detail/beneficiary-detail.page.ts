import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { UserService } from '@services/user.service';

import { Globals } from '@app/globals';

@Component({
  selector: 'app-beneficiary-detail',
  templateUrl: './beneficiary-detail.page.html',
  styleUrls: ['./beneficiary-detail.page.scss'],
})
export class BeneficiaryDetailPage {
  beneficiary: Object = {};
  dataBeneficiary: Object;

  constructor(
    private _globals: Globals,
    private _userService: UserService,
    private activatedRoute: ActivatedRoute,
  ) { }

  async ionViewWillEnter() {
    let user_id = this.activatedRoute.snapshot.params.beneficiary_id;
    let res = await this._userService.getUserByID(user_id);
    this.beneficiary = res;
  }

  getTypeDocumentString(type_document_id) {
    let typeDoc = this._globals.DOCUMENTYPES.find(type_doc => type_doc.idtipoDocumentos == type_document_id);
    return typeDoc ? typeDoc.tipo : '';
  }

  getDepartmentsAndTownsString(id_dep_mun) {
    let dept = this._globals.DEPARTMENTSANDMUNI.find(depts => depts.idmunicipio == id_dep_mun)
    return dept ? `${dept.nombreMunicipio}, ${dept.nombreDepartamento}` : '';
  }
}
