import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PublicationsService } from '@app/services';
import { PromotionsService } from '../../../services/promotions.service';

@Component({
  selector: 'app-detail-promotion',
  templateUrl: './detail-promotion.page.html',
  styleUrls: ['./detail-promotion.page.scss'],
})
export class DetailPromotionPage {
  providerData: any;
  idPromotion: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private _publicationsService: PublicationsService,
    private _promotionService: PromotionsService
  ) { 
    this.idPromotion = this.activatedRoute.snapshot.params.id_promocion;
    

    this._promotionService.getPromotionId(this.idPromotion).then(res => {
      this.providerData = res
      console.log(this.providerData);
      
    })
  }

}
