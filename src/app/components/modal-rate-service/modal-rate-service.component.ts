import { IonSlides, IonTextarea, ModalController } from '@ionic/angular';
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { DynamicClient } from '@app/services/dynamicClient';

@Component({
  selector: 'app-modal-rate-service',
  templateUrl: './modal-rate-service.component.html',
  styleUrls: ['./modal-rate-service.component.scss'],
})
export class ModalRateServiceComponent {
  @Input() appointment: any;
  @Input() idMembers: any;

  @ViewChild('slideRate') slideRate: IonSlides;
  @ViewChild('areaComentary') areaComentary: IonTextarea

  rateAlready: boolean = false;
  touchedRate = false;
  currentSlide = 0;

  countText = 0;

  dataRate = {
    attention: -1,
    puntuality: -1,
    recomendation: -1,
    commentary: ''
  }

  constructor(
    private modalController: ModalController,
    private _dynamicClient: DynamicClient
  ) {
  }

  async setRate(rate: number, type: any) {
    this.dataRate[type] = rate;
    setTimeout(() => {
      this.slideRate.slideNext();

      if (!Object.values(this.dataRate).includes(-1)) {
        this.touchedRate = true;
        this.rateAlready = true;
      }
    }, 300);
  }

  nextSlide() {
    this.slideRate.slideNext();
  }

  prevSlide() {
    this.slideRate.slidePrev();
  }

  async changeSlide() {
    this.currentSlide = await this.slideRate.getActiveIndex();
  }

  async backToRate() {
    this.slideRate.slidePrev();
  }

  async sendRate() {
    let data = {
      idCitasmedicasHistorial: this.appointment.idCitasmedicasHistorial,
      idServicios: this.appointment.idServicios,
      comentario: this.areaComentary.value,
      idMembers: this.idMembers,
      calificacion: Math.ceil((this.dataRate.attention + this.dataRate.puntuality + this.dataRate.recomendation) / 3)
    }

    let res = await this._dynamicClient.postRequest('/calificacion', data).toPromise();
    res.ok && this.close();
  }

  countLetters(elRef) {
    this.countText = elRef.value.length;
  }

  close() {
    this.modalController.dismiss()
  }
}
