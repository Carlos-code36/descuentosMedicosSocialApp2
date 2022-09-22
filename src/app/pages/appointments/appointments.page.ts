import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Globals } from '@app/globals';
import { AppointmentsService, UtilitiesService } from '@app/services';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-appointments',
  templateUrl: './appointments.page.html',
  styleUrls: ['./appointments.page.scss'],
})
export class AppointmentsPage implements OnInit {
  tabs: Array<Object>;
  appointmentsPets: Array<any>;

  edited: boolean = false;

  constructor(
    private _appointmentsService: AppointmentsService,
    private _utilitiesService: UtilitiesService,
    private modalController: ModalController,
    public _globals: Globals,
    private router: Router,) { }

  ngOnInit() {
    this.tabs = [
      {
        path: 'my-appointments',
        icon: 'user',
        label: 'Mis Citas',
        badge: '0',
      },
      {
        path: 'beneficiaries-appointments',
        icon: 'heart',
        label: 'Benficiarios',
        badge: '0',
      },
      {
        path: 'pets-appointments',
        icon: 'paw',
        label: 'Peluditos',
        badge: '0',
      }
    ];
    //this.getActiveAppointments()
  }

  async getActiveAppointments(){
    this.edited = false;
    let idMember = this._globals.USER_OBJECT['idMembers'];
    this.appointmentsPets = await this._appointmentsService.getPetAppoinmentsActive(idMember);
    console.log(this.appointmentsPets);    
  }

  onSwipe(event) {
    console.log(event);
  }

}
