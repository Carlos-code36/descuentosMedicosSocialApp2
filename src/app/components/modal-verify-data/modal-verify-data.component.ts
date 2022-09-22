import { ModalController, NavParams } from '@ionic/angular';
import { Component } from '@angular/core';
import { timeout } from "rxjs/operators";

@Component({
  selector: 'app-modal-verify-data',
  templateUrl: './modal-verify-data.component.html',
  styleUrls: ['./modal-verify-data.component.scss'],
})
export class ModalVerifyDataComponent {
  register: any;
  conteo: number = 5;
  habilitar: boolean = false

  constructor(
    private modalController: ModalController,
    private navParams: NavParams
  ) {
    this.register = this.navParams.get('dataRegister')
    console.log('register', this.register)
    if (this.register.tarjetaProfecional) {
      //console.log(document.querySelector('.modal__data .modal-wrapper'))
      let element = document.querySelector('.modal-wrapper') as HTMLElement;
      element.style.height = '550px';
    }
    
    this.habilitarBoton()
  }

  habilitarBoton(){
    this.habilitarBtn(this.conteo);
  }
  
  habilitarBtn(cont){
    //console.log(cont);
    if (cont == 0) {
      this.habilitar = true;
      //console.log(this.habilitar);
      return this.habilitar;
    }else{
      cont = cont - 1;
      this.conteo = cont
      setTimeout(() => {
        this.habilitarBtn(cont);
      }, 2000);
    }
  }

  close() {
    this.modalController.dismiss(false)
  }

  confirm() {
    this.modalController.dismiss(true)
  }
}
