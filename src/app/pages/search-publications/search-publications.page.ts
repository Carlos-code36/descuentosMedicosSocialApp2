import { Router } from '@angular/router';
import { SessionStorageService } from './../../services/session-storage.service';
import { IonSearchbar } from '@ionic/angular';
import { Component, OnInit, ViewChild, ChangeDetectionStrategy } from '@angular/core';
import { Globals } from '@app/globals';

import { Plugins } from '@capacitor/core';
import { PublicationsService } from '@app/services';
const { Keyboard } = Plugins;

@Component({
  selector: 'app-search-publications',
  templateUrl: './search-publications.page.html',
  styleUrls: ['./search-publications.page.scss'],
})
export class SearchPublicationsPage {
  @ViewChild('inputSearch') searchbar: IonSearchbar;
  @ViewChild('selectDepartment') selectDepartment: HTMLInputElement;

  publications: Array<any> = [];
  filteredPublications: Array<any> = undefined;
  historySearch: Array<String> = [];
  showBoxFinder: boolean = false;
  showBoxFilter: boolean = false;

  namedepmunicipio
  departmentsAndTowns = undefined;

  constructor(
    private router: Router,
    public _globals: Globals,
    private _storageService: SessionStorageService,
    private _publicationsService: PublicationsService
  ) { }

  async ionViewWillEnter() {
    this._storageService.get('publications').then(data => this.publications = data)
    this.historySearch = [...await this._globals.HISTORYSEARCH];
  }

  changeValueSearch(value?) {
    console.log(value);
    this.historySearch.unshift(value || this.searchbar.value);
    this.historySearch.length == 8 && this.historySearch.pop();
    this._globals.HISTORYSEARCH = this.historySearch;

    Keyboard.hide();
    this.showBoxFinder = false;
    this.filteredPublications = this.filterPublications(value || this.searchbar.value);
  }

  filterPublications(value) {
    let output = this.publications.filter(pub => {
      console.log(pub.medicos.filter(med => med.nombres.toLowerCase().includes(value) || med.apellidos.toLowerCase().includes(value)).length > 0);

      return pub.descripcion.toLowerCase().includes(value) ||
        pub.nombreServicio.toLowerCase().includes(value) ||
        pub.nombreEspecialidad.toLowerCase().includes(value) ||
        pub.nombreProvedor.toLowerCase().includes(value) ||
        pub.palabrasClave.filter(val => val.includes(value)).length > 0 ||
        pub.medicos.filter(med => med.nombres.toLowerCase().includes(value) || med.apellidos.toLowerCase().includes(value)).length > 0
    });

    return output;
  }

  detailPublication(event, idService) {
    let parent = event.target.closest('.keywords__publication');
    if (parent) return;

    this.router.navigate([`/home/detail-publication/${idService}`]);
  }

  resetSearch() {
    this.filteredPublications = undefined;
    this.showBoxFinder = false;
  }

  focusSearch(state: boolean) {
    this.showBoxFinder = state;
  }

  clearHistorySearch() {
    this.historySearch = [];
    this._globals.HISTORYSEARCH = undefined;
  }

  // *******************************************************
  showFilters() {
    this.showBoxFilter = !this.showBoxFilter;
  }

  focusDropdownSearch() {
    this.selectDepartment.value = '';
    this.searchDeptMun();
  }

  blurDropdownSearch() {
    // this.namedepmunicipio.value = this.getNameDepMunFromId(idMun);
    setTimeout(() => {
      this.departmentsAndTowns = undefined;
    }, 20);
  }

  searchDeptMun() {
    this.departmentsAndTowns = this._globals.DEPARTMENTSANDMUNI.filter(el => {
      let mun = el.nombreMunicipio.toLowerCase();
      let dep = el.nombreDepartamento.toLowerCase();

      if (mun.includes(this.selectDepartment.value) || dep.includes(this.selectDepartment.value)) {
        return true
      };
    })
  }

  selectDeptMun(target: HTMLElement) {
    let idDepMun = target.getAttribute('data-depmun-id');
    let nameDepMun = target.getAttribute('data-depmun-name');
    this.selectDepartment.value = nameDepMun;

    console.log(this.filteredPublications);    

    // this.filteredPublications = this.filteredPublications.filter(data => {
    //   console.log(data);
    //   return data
    // })

    this.blurDropdownSearch();
  }
}
