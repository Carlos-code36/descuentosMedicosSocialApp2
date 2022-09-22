import { Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ModalController } from '@ionic/angular';

import { ModalRateServiceComponent } from '@app/components/modal-rate-service/modal-rate-service.component';
import { AppointmentsService } from '@app/services';
import { Globals } from '@app/globals';

@Component({
  selector: 'app-appoinments-history',
  templateUrl: './appoinments-history.page.html',
  styleUrls: ['./appoinments-history.page.scss'],
})
export class AppoinmentsHistoryPage {
  @ViewChild('filters') filters: ElementRef;

  isPet: boolean = false;

  refFilters = {
    cancel: 1,
    noAttend: 2,
    successfully: 0
  };

  listApplyFilters = [];

  appoinments;
  appoinmentsHistory;

  filterSuccessfully: boolean = true;
  filterCanceled: boolean = false;
  filterNoAttend: boolean = false;

  constructor(
    private _appointmentsService: AppointmentsService,
    private modalController: ModalController,
    private activatedRoute: ActivatedRoute,
    private _globals: Globals,

  ) {
    this.isPet = activatedRoute.snapshot.params.type == 'pet';
    this._appointmentsService.getAppoinmentsHistory(this._globals.USER_OBJECT['idMembers'], this.isPet).then(rs => {
      this.appoinments = [...rs].reverse();
      this.listApplyFilters = ['successfully'];
      this.applyFilters();
    });

  }

  showFilters() {
    this.filters.nativeElement.firstElementChild.classList.add('active');
    this.filters.nativeElement.lastElementChild.classList.add('active');
  }

  applyFilters() {
    this.listApplyFilters = [];

    this.filterSuccessfully && this.listApplyFilters.push('successfully');
    this.filterNoAttend && this.listApplyFilters.push('noAttend');
    this.filterCanceled && this.listApplyFilters.push('cancel');

    this.appoinmentsHistory = [...this.appoinments].filter(el => {
      let rs = false;
      this.listApplyFilters.forEach(f => rs = (this.refFilters[f] === el.cancelada) || rs);
      return rs;
    });
    this.closeFilters();
  }

  closeFilters() {
    this.filters.nativeElement.firstElementChild.classList.remove('active');
    this.filters.nativeElement.lastElementChild.classList.remove('active');
  }

  async rateAppointment(appointment) {
    if (appointment['cancelada'] != 0) return

    let modal = await this.modalController.create({
      component: ModalRateServiceComponent,
      cssClass: 'modal__template',
      componentProps: {
        'idMembers': this._globals.USER_OBJECT['idMembers'],
        'appointment': appointment
      }
    });

    modal.present();
  }
}
