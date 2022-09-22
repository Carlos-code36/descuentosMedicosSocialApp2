import { Component, Input, OnInit, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { Globals } from '@app/globals';
import { BeneficiariesService } from '@app/services';

@Component({
  selector: 'card-beneficiary',
  templateUrl: './card-beneficiary.component.html',
  styleUrls: ['./card-beneficiary.component.scss'],
})
export class CardBeneficiaryComponent {
  @Input() cardType: String = 'persons';
  @Input() type: String = 'person';
  @Input() titular?: boolean = false;
  @Input() person?: Object = null;
  @Input() pet?: Object = null;
  @Input() group?: Object = null;
  @Input() options?: Object = null;

  groupsBeneficiaries: Array<any> = [];
  beneficiaries = [];

  constructor(
    private router: Router,
    private _globals: Globals,
    private _beneficiariesService: BeneficiariesService,
    private render: Renderer2
  ) { }

  openOptions(event) {
    let el = (event.target as HTMLElement).closest('.options__button');

    if (el) {
      let options = el.querySelector('.menu__options')
      if (options.classList.contains('open')) {
        this.render.removeClass(options, 'open');
      } else {
        this.render.addClass(options, 'open');
      }
    }
  }

  detailGroup(group_id) {
    if (this.type == 'persons') this.router.navigate([`beneficiaries-tabs/beneficiaries/${group_id}`]);
    // if (this.type == 'pets') this.router.navigate([`beneficiaries-tabs/pets/${group_id}`]);
  }

  detailBeneficiary(user) {
    this.router.navigate([`beneficiaries-tabs/beneficiaries/detail/${user.idMembers}`]);
  }

  editBeneficiary(value) {
    this.person && this.router.navigate([`/beneficiaries/edit/${value['idMembers']}`]);
    this.pet && this.router.navigate([`/pets/edit/${value['idMascotas']}`]);
  }

  deletBeneficiary(){
    this._beneficiariesService.getBeneficiariesGroupByMember(this._globals.USER_OBJECT['idMembers']).subscribe( res => {
      
      this.groupsBeneficiaries = res;
      this.beneficiaries = this.groupsBeneficiaries.map(e => e.beneficiarios).flat();
      console.log(this.beneficiaries);
    } )
  }
}
