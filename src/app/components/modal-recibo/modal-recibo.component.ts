import { Component } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';

import { Globals } from '@app/globals';
import { UtilitiesService } from '@app/services';

@Component({
  selector: 'app-modal-recibo',
  templateUrl: './modal-recibo.component.html',
  styleUrls: ['./modal-recibo.component.scss'],
})
export class ModalReciboComponent {

  dataCita: any;
  dataBeneficiarios: any;
  dataSucursal: any;
  dataServicio: any;
  dataUsuario: any;
  data: any;
  datosCitaGenereda: any;
  fechaActual: any;
  edadUsuario: any;
  ciudad: string;
  index: any;
  precioDescuento: any;

  screen: any;
  state: boolean = false;

  constructor(
    private modalController: ModalController,
    private _utilityService: UtilitiesService,
    private navParams: NavParams
  ) {
    this.dataCita = this.navParams.get('data_cita');
    this.dataBeneficiarios = this.navParams.get('data_beneficiarios');
    this.dataSucursal = this.navParams.get('data_sucursal');
    this.dataServicio = this.navParams.get('data_servicio');
    this.datosCitaGenereda = this.navParams.get('data_appointment');
    this.index = this.navParams.get('data_index');
    console.log(this.datosCitaGenereda, this.dataBeneficiarios);
    this.usarDatos();
  }

  usarDatos() {
    let idUsuario = this.dataCita.toSend?.paciente;

    var currentTime = new Date();
    this.fechaActual = currentTime.getFullYear()
    this.edadUsuario = this.fechaActual - this.datosCitaGenereda?.fechaNacimiento.substring(0,4);
    this.precioDescuento = this.datosCitaGenereda?.precioSubservicio - ((this.datosCitaGenereda?.precioSubservicio * this.datosCitaGenereda?.descuento)/100);
    console.log(this.precioDescuento);
    
    // if (this.dataUsuario.fechaNacimiento =! undefined) {
    //   this.edadUsuario = this.fechaActual - this.dataUsuario?.fechaNacimiento.substring(0,4);
    // }else{
    //   this.edadUsuario = this.fechaActual - this.datosCitaGenereda?.fechaNacimiento.substring(0,4);
    // }
    console.log(this.fechaActual, this.edadUsuario, this.index);
    
    if (this.dataBeneficiarios === undefined) return
    
    for (let i = 0; i < this.dataBeneficiarios.length; i++) {
      if (idUsuario == this.dataBeneficiarios[i]?.idMembers || this.index == i) {
        this.dataUsuario = this.dataBeneficiarios[i]
        this.edadUsuario = this.fechaActual - this.dataUsuario?.fechaNacimiento.substring(0,4);
        if (this.dataServicio != undefined) {
          this.precioDescuento = this.dataServicio?.precioSubservicio - ((this.dataServicio?.precioSubservicio * this.dataServicio?.descuentoSubServicio)/100);
        }else{
          this.precioDescuento = this.dataUsuario?.precioSubservicio - ((this.dataUsuario?.precioSubservicio * this.dataUsuario?.descuento)/100);
        }
      }
    }
  }

  /**
   * Method to generate image to download appoinment ticket.
   */
  async generateTicket(_element: any, share?) {
    let _output = await this._utilityService.generateImg(_element, true);
    // this._utilityService.showLocalNotification({ text: 'Se guardó correctamente la orden de descuento', title: 'Orden guardada' });
    _output && this._utilityService.showToast('Se guardó correctamente la orden de descuento');
    this.modalController.dismiss();
  }

  close() {
    this.modalController.dismiss();
  }

}