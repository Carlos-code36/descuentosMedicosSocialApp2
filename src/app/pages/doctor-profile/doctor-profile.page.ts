import { UserService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Globals } from '@app/globals';

@Component({
  selector: 'app-doctor-profile',
  templateUrl: './doctor-profile.page.html',
  styleUrls: ['./doctor-profile.page.scss'],
})
export class DoctorProfilePage {
  dataDoctor;
  scrollPosition: number = 0;


  constructor(
    private activatedRoute: ActivatedRoute,
    private _userService: UserService,
    public _globals: Globals
  ) {
    this.getDataDoctor();
  }

  public async getDataDoctor() {
    this.dataDoctor = await this._userService.getUserByID(this.activatedRoute.snapshot.params.id_members, 'medico');
    console.log(this.dataDoctor);
  }

  getTypeDocumentString(type_document_id) {
    let typeDoc = this._globals.DOCUMENTYPES.find(type_doc => type_doc.idtipoDocumentos == type_document_id);
    return typeDoc ? typeDoc.tipo : '';
  }

  getDepartmentsAndTownsString(id_dep_mun) {
    let dept = this._globals.DEPARTMENTSANDMUNI?.find(depts => depts.idmunicipio == id_dep_mun)
    return dept ? `${dept.nombreMunicipio}, ${dept.nombreDepartamento}` : '';
  }

  toggleAccordion(el) {
    let items = document.querySelectorAll('.accordion__item button');
    let icon = el.getAttribute('data-icon');
    let item = el.getAttribute('aria-expanded');

    items.forEach(itm => {
      itm.setAttribute('data-icon', 'down')
      itm.setAttribute('aria-expanded', 'false')
    });
    icon == 'down' && el.setAttribute('data-icon', 'up');
    item == 'false' && el.setAttribute('aria-expanded', 'true');
  }

  public refreshData(event) {
    this.getDataDoctor();
    setTimeout(() => {
      event.target.complete();
    }, 1000);
  }
}
