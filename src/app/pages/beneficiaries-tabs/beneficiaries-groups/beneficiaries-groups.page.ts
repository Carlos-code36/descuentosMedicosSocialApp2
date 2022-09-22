import { ModalController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { Component } from '@angular/core';

import { Enter, Leave } from '@animations/modalAnimations';

import { ModalNewGroupComponent } from '@components/modal-new-group/modal-new-group.component';
import { BeneficiariesService } from '@services/benificiaries.service';
import { Globals } from '@app/globals';

@Component({
  selector: 'app-beneficiaries-groups',
  templateUrl: './beneficiaries-groups.page.html',
  styleUrls: ['./beneficiaries-groups.page.scss'],
})
export class BeneficiariesGroupsPage {
  typeGroup: String = '';
  groups_beneficiaries: Array<object> = [];

  constructor(
    private router: Router,
    private globals: Globals,
    private activatedRoute: ActivatedRoute,
    private modalController: ModalController,
    private _beneficiariesService: BeneficiariesService
  ) {
    this.typeGroup = this.activatedRoute.snapshot.params.group_type;
  }

  ionViewWillEnter() {
    console.log('grupos beneficiarios');
    
    this._beneficiariesService.getGroupsForMember(this.globals.USER_OBJECT['idMembers']).subscribe(res => this.groups_beneficiaries = res);
  }

  /**
   * Método que lanza el modal para crear un nuevo grupo
   */
  async addGroup() {
    let modal = await this.modalController.create({
      component: ModalNewGroupComponent,
      cssClass: 'modal__new__group',
      leaveAnimation: Leave,
      enterAnimation: Enter
    });

    modal.present();

    modal.onDidDismiss().then(rs => {
      if (!rs['data']) {
        this.router.navigate(['/beneficiaries-tabs/groups_beneficiaries/persons']);
        return;
      }

      this.router.navigate([`/beneficiaries/create/person/0/${rs['data']}`]);
    })
  }
}
