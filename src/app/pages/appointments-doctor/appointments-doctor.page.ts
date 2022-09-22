import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { DoctorService, SessionStorageService } from '@app/services';
import { Globals } from '@app/globals';

@Component({
  selector: 'app-appointments-doctor',
  templateUrl: './appointments-doctor.page.html',
  styleUrls: ['./appointments-doctor.page.scss'],
})
export class AppointmentsDoctorPage {
  service: Object = {};
  schedules: Array<any>;
  doctorId = this._globals.USER_OBJECT['idMedico'];

  constructor(
    private _globals: Globals,
    private router: ActivatedRoute,
    private _doctorService: DoctorService,
    private _storageService: SessionStorageService
  ) {
    this.getDataService()
  }

  async getDataService() {
    let services = await this._storageService.get('doctor_services');
    console.log(services);

    // this.service = services.find(srv => srv.idServicios == this.router.snapshot.paramMap.get('id_service'));
  }
}
