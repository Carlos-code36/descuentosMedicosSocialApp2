import { SepareWordsPipe } from '@pipes/separeWords.pipe';
import { SessionStorageService } from '@services/session-storage.service';
import { HeaderComponent } from '@components/header/header.component';
import { Component, OnInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { IonContent, IonSearchbar } from '@ionic/angular';
import { Router } from '@angular/router';

import { PublicationsService } from '@services/publications.service';
import { UtilitiesService } from '@services/utilities.service';
import { Globals } from '@app/globals';

@Component({
  selector: 'app-publications',
  templateUrl: './publications.page.html',
  styleUrls: ['./publications.page.scss'],
  providers: [SepareWordsPipe]
})
export class PublicationsPage {
  @ViewChild('searchbar') inputSearchbar: ElementRef;
  @ViewChild('HeaderComponent') headerTemplate: HeaderComponent;
  @ViewChild('inputSearchDeptMun') searchbarDepMun: IonSearchbar;
  @ViewChild('inputSearchPublication') searchbarPublication: IonSearchbar;

  @ViewChild('selectDepartment') selectDepartment: HTMLInputElement;
  @ViewChild(IonContent) content: IonContent;


  departmentsAndTowns: Array<any>;
  listPublications: Array<any> = [];
  filteredPublications: Array<any> = [];
  calification: number = 4;
  keywords: Array<any>;
  onSearch: boolean = false;

  frasesClaves: any;
  Palabras: Array<any> = [];
  palabraCompletada: any[];

  User: any;

  locationSearch: any;

  searchValue: string = undefined;
  idDepartmentSetted = undefined;

  listFilters = ['medicos:nombres,apellidos', 'descripcion', 'nombreServicio', 'nombreEspecialidad', 'nombreProvedor', 'palabrasClave']
  // listFilters = ['medicos:nombres,apellidos', 'descripcion', 'nombreServicio', 'nombreEspecialidad', 'nombreProvedor', 'palabrasClave']
  filtersSelected = []

  viewFilter: boolean = false;
  limit = 15;
  post: any;
  cont = 15;
  total;
  list;
  cont1: number;
  $ionicScrollDelegate
  slideData = [
    { rute: '/assets/img/slides/banner1a.png' },
    { rute: '/assets/img/slides/banner2a.jpg' },
    { rute: '/assets/img/slides/banner3a.png' }
  ]

  constructor(
    private router: Router,
    private _globals: Globals,
    private renderer: Renderer2,
    private _utilitiesService: UtilitiesService,
    private _storageService: SessionStorageService,
    private _publicationsService: PublicationsService
  ) {
    // this.setLocationSearch(13301);
    // this.loadAllPublications();
    /* this._publicationsService.getAllServices().then(res =>{
      this.frasesClaves = res;
      
      for (let i = 0; i < this.frasesClaves.length; i++) {
        let tmp = this.frasesClaves[i].palabrasClave;
        for (let j = 0; j < tmp.length; j++) {
          this.Palabras.push(tmp[j])
        }
      }
      this.Palabras = [...new Set(this.Palabras)]
      console.log(this.Palabras);
    }) */
  }

  loadAllPublications() {
    this._publicationsService.getAllServices().then(res => {
      // console.log(res.length);

      this.listPublications = res;
      this.filteredPublications = res;
    })
  }

  loadPublications(idDepMun: number) {
    this.idDepartmentSetted = idDepMun;
    // console.log(this.listPublications.length);

    // if (this.cont <= this.total) {
    this._publicationsService.getServiceByPlace(idDepMun, this.cont).then(res => {
      // console.log(res);
      this.filteredPublications = res.body;
      console.log(this.filteredPublications);
      
      this.listPublications = res.body;
      this.total = res['total'];
      //console.log(this.listPublications);
      this._utilitiesService.closeLoader();
    })
  }

  loadData(event) {
    console.log(this.searchValue);
    
    if (this.searchValue != undefined){
      event.target.complete();
      return
    }

    setTimeout(() => {
      console.log('listas publicaciones= ', this.listPublications.length);
      console.log('total= ', this.total);
      if (this.listPublications.length === this.total) {
        event.target.complete();
        event.target.disabled = true;
        return;
      }
    }, 1000);
      this.cont += 15;
      this.loadPublications(this.idDepartmentSetted);
      event.target.complete();
  }

  certificadoActivado() {
  }


  refreshPublications(event) {
    this.idDepartmentSetted ? this.loadPublications(this.idDepartmentSetted) : this.loadAllPublications();
    setTimeout(() => {
      event.target.complete();
    }, 1000);
  }

  detailPublication(event, idService, idsubservice) {
    let parent = event.target.closest('.keywords__publication');
    if (parent) return;

    this.router.navigate([`/home/detail-publication/${idService}/${idsubservice}/${this.idDepartmentSetted}`]);
  }

  setLocationSearch(idDepartment) {
    this.locationSearch = idDepartment;
  }

  setFoundData(event) {
    console.log(event);

    if (event == undefined) {
      this.filteredPublications = this.listPublications;
      this.searchValue = undefined;
      this.onSearch = false;
      return
    }

    this.searchValue = event[1];
    console.log(this.searchValue);
    
    this.onSearch = event ? true : false;
    this.filteredPublications = event[0] || this.listPublications;
  }

  autocompletar(event: HTMLInputElement) {
    const buscar = event.value;

    const filtrar = () => {
      const busqueda = buscar.toLowerCase()

      for (let palabra of this.Palabras) {
        let nombre = palabra.toLowerCase();
        if (nombre.indexOf(busqueda) !== -1) {
          this.filteredPublications = palabra
        }
      }
    }
  }

  selectPalabra(target: HTMLElement) {
    console.log(target);

    let valor = target.getAttribute('data-frase');
    console.log(valor);
    //this.setFoundData(valor);
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
    this._storageService.set('publications', this.listPublications);
    this.renderer.addClass(this.inputSearchbar.nativeElement, 'active');
    this.searchbarPublication.setFocus();
  }
}
