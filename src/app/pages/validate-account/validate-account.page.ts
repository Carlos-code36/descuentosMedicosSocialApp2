import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component } from '@angular/core';

import { Globals } from '@app/globals';
import { AuthService, GlobalDataService } from '@app/services';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-validate-account',
  templateUrl: './validate-account.page.html',
  styleUrls: ['./validate-account.page.scss'],
})
export class ValidateAccountPage {
  // @ViewChild('inp_1') input_1: ElementRef;
  // @ViewChild('inp_2') input_2: ElementRef;
  // @ViewChild('inp_3') input_3: ElementRef;
  // @ViewChild('inp_4') input_4: ElementRef;
  // @ViewChild('inp_5') input_5: ElementRef;
  // @ViewChild('inp_6') input_6: ElementRef;
  // @ViewChild('inp_7') input_7: ElementRef;

  member: any;
  nameUser: string;
  validationCode: number;
  emailValidation: string;

  formValidation: FormGroup;

  constructor(
    public _globals: Globals,
    private _authService: AuthService,
    private menuControler: MenuController,
    private _globalDataService: GlobalDataService
  ) {
    this._globals.loadData().then(() => {
      this.member = this._globals.USER_OBJECT;
    })

    this.menuControler.enable(false);
  }

  ngOnInit() {
    this.formValidation = new FormGroup({
      validationCode: new FormControl('', [Validators.required, Validators.maxLength(7), Validators.pattern(/^[0-9]\d*$/)])
    });
  }

  ionViewWillEnter() {
    // console.log(this.member);
    // console.log(this.input_1.nativeElement);
  }

  setValidation(event) {
    console.log(event);
  }

  async validateAccount(type) {
    let data = {
      codigo: this.formValidation.value.validationCode,
      idMembers: this._globals.USER_ID,
      opcion: type
    }

    this._authService.validateAccount(data).then(() => {
      this._globalDataService.getUserLogged(true);
      this.menuControler.enable(true);
    })
  }

  async resendCode(type) {
    type == 'mail' && await this._authService.resendEmailCodeValidation(this.member);
    type == 'phone' && await this._authService.sendPhoneCodeValidation({ idMembers: this.member?.idMembers, numero: this.member?.telefono });
  }

}
