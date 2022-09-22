import { PublicationsService } from '@app/services';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-full-data-provider',
  templateUrl: './full-data-provider.page.html',
  styleUrls: ['./full-data-provider.page.scss'],
})
export class FullDataProviderPage {
  idProvider
  providerData

  constructor(
    private activatedRoute: ActivatedRoute,
    private _publicationsService: PublicationsService
  ) {
    console.log(this.activatedRoute.snapshot.params.id_members);
    
    this._publicationsService.getMemberDataById(this.activatedRoute.snapshot.params.id_members).then(res => {
      this.providerData = res;
      console.log(this.providerData);
    });
  }

}
