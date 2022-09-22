import { AuthService } from './../../services/auth.service';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

import { Globals } from '@app/globals';
import { ModalController } from '@ionic/angular';
import { ModalCarnetComponent } from '../../components/modal-carnet/modal-carnet.component';
import { UserService } from '../../services/user.service';
import { BeneficiariesService, GlobalDataService } from '@app/services';

@Component({
  selector: 'app-preview-profile',
  templateUrl: './preview-profile.page.html',
  styleUrls: ['./preview-profile.page.scss'],
})
export class PreviewProfilePage {
  member: Object;
  grupo: any;
  toRefresh: boolean = false;

  constructor(
    private _authService: AuthService,
    private modalController: ModalController,
    private _userService: UserService,
    private _beneficiariesService: BeneficiariesService,
    private _globalDataService: GlobalDataService,
    public _globals: Globals
  ) { }

  async ionViewDidEnter() {
    this.member = await this._globals.USER_OBJECT;
    //console.log(this._globals.GROUP['idGrupos']);
  }

  refreshData(event?) {
    this.member = this._globals.USER_OBJECT;

    setTimeout(() => {
      this.toRefresh = false;
      event.target.complete();
    }, 1000);
  }

  editProfile(param?) {
    this.toRefresh = param || true;
  }

  getBirthday() {
    let dateTemp = new Date(this._globals.USER_OBJECT['fechaNacimiento']);
    dateTemp.setHours(dateTemp.getHours() + 12);
    return dateTemp.toISOString().slice(0, 10);
  }

  getTypeDocumentString(type_document_id) {
    let typeDoc = this._globals.DOCUMENTYPES.find(type_doc => type_doc.idtipoDocumentos == type_document_id);
    return typeDoc ? typeDoc.tipo : '';
  }

  getDepartmentsAndTownsString(id_dep_mun) {
    let dept = this._globals.DEPARTMENTSANDMUNI.find(depts => depts.idmunicipio == id_dep_mun)
    return dept ? `${dept.nombreMunicipio}, ${dept.nombreDepartamento}` : '';
  }

  generarPDF(){
    const doc = new jsPDF();

    doc.text(this.member['nombres'], 10, 10);
    doc.text(this.member['apellidos'], 10, 20);
    doc.save('Hola-Mundo.pdf');
  }

  async mostrarCarnet(){

    let modal = await this.modalController.create({
      component: ModalCarnetComponent,
      cssClass: ['modal__carnet', 'carnet__detail'],
      backdropDismiss: false,
      componentProps:{
        dataUser: this.member
      }
    });

    modal.present();
  }

  closeAccount() {
    this._authService.closeAccount();
  }

  ngOnDestroy() {
    this.member = undefined;
  }
}
