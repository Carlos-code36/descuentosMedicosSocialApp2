import { Component, ElementRef, ViewChild, Renderer2 } from '@angular/core';
import { HeaderComponent } from '@app/components/header/header.component';
import { IonSearchbar } from '@ionic/angular';
import { SepareWordsPipe } from '@pipes/separeWords.pipe';
import { SessionStorageService } from '@services/session-storage.service';
import { Router } from '@angular/router';
import $ from "jquery";

import { PublicationsService } from '@services/publications.service';
import { UtilitiesService } from '@services/utilities.service';
import { Globals } from '@app/globals';
import { PromotionsService } from '../../../services/promotions.service';


@Component({
  selector: 'app-promotions',
  templateUrl: './promotions.pages.html',
  styleUrls: ['./promotions.pages.scss'],
})
export class PromotionsPages {

  @ViewChild('searchbar') inputSearchbar: ElementRef;
  @ViewChild('HeaderComponent') headerTemplate: HeaderComponent;
  @ViewChild('inputSearchDeptMun') searchbarDepMun: IonSearchbar;
  @ViewChild('inputSearchPublication') searchbarPublication: IonSearchbar;

  @ViewChild('selectDepartment') selectDepartment: HTMLInputElement;

  listPromotions: Array<any> = [];
  filteredPromotions: Array<any> = [];

  locationSearch: any;

  onSearch: boolean = false;
  searchValue: string = undefined;
  idDepartmentSetted = undefined;

  listFilters = ['medicos:nombres,apellidos', 'descripcion', 'nombreServicio', 'nombreEspecialidad', 'nombreProveedor', '$palabrasClave']
  filtersSelected = []

  constructor(
    private router: Router,
    private _globals: Globals,
    private renderer: Renderer2,
    private _utilitiesService: UtilitiesService,
    private _storageService: SessionStorageService,
    private _promotionService: PromotionsService
  ) {
    /* $(document).ready(function() {

      var s_round = '.s_round';
    
      $(s_round).hover(function() {
        $('.b_round').toggleClass('b_round_hover');
        return false;
      });
    
      $(s_round).click(function() {
        $('.flip_box').toggleClass('flipped');
        $(this).addClass('s_round_click');
        $('.s_arrow').toggleClass('s_arrow_rotate');
        $('.b_round').toggleClass('b_round_back_hover');
        return false;
      });
    
      $(s_round).on('transitionend', function() {
        $(this).removeClass('s_round_click');
        $(this).addClass('s_round_back');
        return false;
      });
    }); */
  }

  loadAllPublications() {
    this._promotionService.getAllServices().then(res => {
      this.listPromotions = res;
      this.filteredPromotions = res;
    })
  }

  loadPublications(idDepMun: number) {
    this.idDepartmentSetted = idDepMun;
    this._promotionService.getPromotionByPlace(idDepMun).then(res => {
      this.filteredPromotions = res;
      this.listPromotions = res;
      console.log(this.filteredPromotions);
    })
  }

  click1(event: Event) {
    let target = (event.target as HTMLElement);
    target.classList.add('s_round_click');

    let flip_box_class = target.parentElement.parentElement.parentElement.firstElementChild.classList;
    let s_arrow_class = target.classList;
    let b_round_class = target.parentElement.classList;

    flip_box_class.contains('flipped') ? flip_box_class.remove('flipped') : flip_box_class.add('flipped');
    s_arrow_class.contains('s_arrow_rotate') ? s_arrow_class.remove('s_arrow_rotate') : s_arrow_class.add('s_arrow_rotate');
    b_round_class.contains('b_round_back_hover') ? b_round_class.remove('b_round_back_hover') : b_round_class.add('b_round_back_hover');
  }

  click2(event: Event) {
    (event.target as HTMLElement).classList.add('s_round_back');
    (event.target as HTMLElement).classList.remove('s_round_click');
  }

  detailPromotion(event, idPromocion) {
    let parent = event.target.closest('.keywords__publication');
    if (parent) return;
    
    this.router.navigate([`/home/detail-promotion/${idPromocion}`]);
  }

  refreshPublications(event) {
    this.idDepartmentSetted ? this.loadPublications(this.idDepartmentSetted) : this.loadAllPublications();
    setTimeout(() => {
      event.target.complete();
    }, 1000);
  }

  setFoundData(event) {
    if (event == undefined) {
      this.filteredPromotions = this.listPromotions;
      this.searchValue = undefined;
      this.onSearch = false;
      return
    }

    this.searchValue = event[1];
    this.onSearch = event ? true : false;
    this.filteredPromotions = event[0] || this.listPromotions;
  }

  //****************************************************************************** */
  //*****************  Methods Filter Department and Municipality  *****************/
  //****************************************************************************** */
  resetSearch() {
    this._utilitiesService.showLoader();
    setTimeout(() => {
      this._utilitiesService.closeLoader();
      this.locationSearch = undefined;
    }, 500)
  }

  setSearch(event) {
    this._storageService.set('publications', this.listPromotions);
    this.renderer.addClass(this.inputSearchbar.nativeElement, 'active');
    this.searchbarPublication.setFocus();
  }

}
