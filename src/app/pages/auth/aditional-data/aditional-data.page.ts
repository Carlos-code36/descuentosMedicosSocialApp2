import { Component, OnInit, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalController, NavParams } from '@ionic/angular';

import { Globals } from '@app/globals';

@Component({
  selector: 'app-aditional-data',
  templateUrl: './aditional-data.page.html',
  styleUrls: ['./aditional-data.page.scss'],
})
export class AditionalDataPage implements OnInit {
  @Input() type: string;

  filteredRethusList: Array<any> = undefined;
  formAditionalData: FormGroup;
  modalType = undefined;

  typeAccount = 'user';

  constructor(
    public _globals: Globals,
    private navParams: NavParams,
    private modalController: ModalController
  ) { }

  ngOnInit() {
    this.initializeForm();
  }

  initializeForm() {
    this.modalType = this.navParams.get('selectorType');
    this.formAditionalData = new FormGroup({
      profetionalCard: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(10), Validators.pattern('[0-9]*')]),
      rethusDataName: new FormControl('', [Validators.required]),
      rethus: new FormControl('', [Validators.required]),
    })
  }

  focusDropdownSearch(el: HTMLInputElement) {
    this.formAditionalData.controls.rethusDataName.setValue('');
    this.searchRethus(el);
  }

  blurDropdownSearch() {
    let rethusId = this.formAditionalData?.value?.rethus;
    
    setTimeout(() => {
      this.filteredRethusList = undefined;
      if (rethusId == '') return;
      this.formAditionalData.controls.rethusDataName.setValue(this.getNameRethusById(rethusId));
    }, 150);
  }

  searchRethus(event: HTMLInputElement) {
    this.filteredRethusList = this._globals.SPECIALITIES.filter(el => {
      let name = el.nombreEspecialidad.toLowerCase();
      if (name.includes(event.value)) return true;
    })
  }

  selectRethusItem(target: HTMLElement) {
    let selRethusData = target.getAttribute('data-rethus-id');
    this.formAditionalData.controls.rethus.setValue(selRethusData);
    this.blurDropdownSearch();
  }

  getNameRethusById(rethusId: number) {
    let speciality = this._globals.SPECIALITIES.find(dt => dt.idEspecialidad == rethusId);
    return speciality.nombreEspecialidad.split('-')[1];
  }

  close() {
    this.modalController.dismiss();
  }

  confirm() {
    if (this.modalType) {
      this.modalController.dismiss(this.typeAccount);
    } else {
      let aditionalData = {
        tarjetaProfecional: this.formAditionalData.value.profetionalCard,
        idEspecialidad: this.formAditionalData.value.rethus
      }
      this.modalController.dismiss(aditionalData);
    }


  }
}