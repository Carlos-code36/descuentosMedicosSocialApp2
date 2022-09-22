import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';

import { Globals } from '@app/globals';
import { DoctorService, SessionStorageService, UtilitiesService } from '@app/services';

@Component({
  selector: 'app-doctor-services',
  templateUrl: './agenda-doctor.page.html',
  styleUrls: ['./agenda-doctor.page.scss'],
})
export class DoctorServicesPage {
  openSchedules: boolean = true;
  selectedService: object;
  services: Array<any>;
  
  constructor(
    private _globals: Globals,
    private render: Renderer2,
    private _doctorService: DoctorService,
    private _storageService: SessionStorageService,
    private _utilitiesService: UtilitiesService,

  ) {
    // console.log(this._globals.USER_OBJECT);
    this.getDataServicesDoctor();
    this.ngOnInit();
  }
  ngOnInit() {
    let links = document.querySelectorAll('.link__page');
    let buble = document.querySelector('.buble') as HTMLElement;

    links.forEach(el => {
      el.addEventListener('click', (e) => {
        document.querySelector('.link__page.active').classList.remove('active')
        el.classList.add('active');

        buble.style.left = `${el['offsetLeft'] + 42}px`
      })
    })
  }

  async getDataServicesDoctor() {
    this.services = await this._doctorService.getFullDataDoctor(this._globals.USER_OBJECT['idMedico']);
    console.log(this.services);
  }

  showSchedules(service, cardRef: HTMLElement, buttonRef) {
    if (buttonRef.name == 'chevron-up') {
      buttonRef.name = 'chevron-down';
      this.render.removeClass(cardRef, 'visible');
    } else {
      buttonRef.name = 'chevron-up';
      this.render.addClass(cardRef, 'visible');
    }
  }

  // async selectService(service) {
  //   console.log(service);
  //   this.selectedService = service;
  // }
  
  
  async cancelAppointment(appoinment) //cancelar cita
  {
    let res = await this._utilitiesService.showConfirmDialog('Cancelar cita', '¿Esta seguro que desea cancelar su cita?')
    let ent = res && await this._utilitiesService.showEnterDialog('Motivo de cancelación', 'Ingrese el motivo de cancelación de la cita')
    let out = ent && await this._doctorService.cancelAppointment(appoinment['idCitasmedicasactivas'],ent);
    out && this.getDataServicesDoctor();
  }
  
  // async cancelAppointment(appoinment) {
  //   let res = await this._utilitiesService.showConfirmDialog('Cancelar cita', '¿Esta seguro que desea cancelar su cita?')
  //   let out = res && this._appointmentsService.cancelAppointment(appoinment['idCitasmedicasactivas']);
  //   out && this.getActiveAppointments();
  // }
  // async reprogramAppointment(appoinment) //reprogramar cita 
  // {
  //   let output = await this._utilitiesService.showConfirmDialog('Reprogramar cita', '¿Esta seguro que desea cancelar y reprogramar su cita?')
  //   output && this.reprogram(appoinment);
  // }
  // reprogram(appoinment) {
  //   this._utilitiesService.showLoader();
  //   this._doctorService.reprogramAppointment(appoinment['idCitasmedicasactivas']).then(
  //     (res: any) => {
  //       this.getDataServicesDoctor();
  //     }
  //   ).catch(
  //     (err) => {
  //       this._utilitiesService.showToast(err.error.message);
  //     }
  //   )
    
  // }
}
