import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-modal-new-group',
  templateUrl: './modal-new-group.component.html',
  styleUrls: ['./modal-new-group.component.scss'],
})
export class ModalNewGroupComponent implements OnInit {
  myform = new FormControl('', [Validators.required, Validators.minLength(5)])

  errorRequired: boolean = false;
  errorMin: boolean = false;

  constructor(
    private modalController: ModalController
  ) { }

  ngOnInit() { }

  close() {
    this.modalController.dismiss();
  }

  detectChangues(event) {
    this.myform.setValue(event.target.value);
    this.errorRequired = false;
    this.errorMin = false;

    if (this.myform.hasError('required')) this.errorRequired = true;
    if (this.myform.hasError('minlength')) this.errorRequired = true;
  }

  createGroup() {
    this.modalController.dismiss(this.myform.value);
  }
}
