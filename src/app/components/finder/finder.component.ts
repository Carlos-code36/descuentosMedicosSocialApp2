import { Component, EventEmitter, Input, Output, SimpleChanges, ViewChild } from '@angular/core';
import { IonSearchbar } from '@ionic/angular';

import { Globals } from '@app/globals';
import { Plugins } from '@capacitor/core';
import { DynamicClient } from '@app/services/dynamicClient';
import { AuthService } from '../../services/auth.service';
import { UtilitiesService } from '@app/services';
import { Router } from '@angular/router';

const { Keyboard } = Plugins;

@Component({
  selector: 'finder',
  templateUrl: './finder.component.html',
  styleUrls: ['./finder.component.scss'],
})
export class FinderComponent {
  @Input('searchData') searchData: Array<any>;
  @Input('filters') filters: Array<any>;

  @Output('foundData') foundData = new EventEmitter();

  @ViewChild('searchbar') searchbar: IonSearchbar;

  output = false;
  showBoxFinder: boolean = false;
  historySearch: Array<String> = [];
  member: any;

  constructor(
    public _globals: Globals,
    public _dynamicClient: DynamicClient,
    public _authService: AuthService,
    private _utilitiesService: UtilitiesService,
    public router: Router
  ) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes?.filters?.currentValue) {
      this.filters = changes?.filters?.currentValue
      // this.changeValueSearch();
    }
  }

  ngAfterViewInit() {
    this.historySearch = this._globals.HISTORYSEARCH || [];
  }

  async verifyData(){
    this.member = await this._authService.getLoggedStorage();
    if (this.member) {
      console.log(this.member);

      this.member['validada'] == 0 && this.router.navigate(['/home/profile']);
    }
  }

  resetSearch() {
    this.showBoxFinder = false;
    this.foundData.emit(undefined);
  }

  focusSearch(state: boolean) {
    this.showBoxFinder = state;
  }

  searchOnHistory(event) {
    this.historySearch = this.findMatches(event.target.value, this._globals.HISTORYSEARCH);
  }

  findMatches(wordToSearch, values) {
    return values.filter(target => {
      let regex = new RegExp(wordToSearch, 'gi');
      return target.match(regex);
    })
  }

  clearHistorySearch() {
    this.historySearch = [];
    this._globals.HISTORYSEARCH = undefined;
  }

  changeValueSearch(value?) {
    //console.log(value, this.searchbar?.value);
    
    if (!(!this.searchbar?.value || !value)) return
    if (this.searchbar?.value.length == 0 && !value) return
    // console.log(this.searchbar?.value)

    setTimeout(() => {
      this.historySearch.unshift(value || this.searchbar.value);
      this._globals.HISTORYSEARCH = this.historySearch;
      this.searchbar.value = value || this.searchbar.value;
      this.filterData(value || this.searchbar.value, this.filters);
    }, 1000);

  }

  // filterData(searchValue: string, args: Array<string>) {
  //   //console.log(searchValue);
    
  //   if (!searchValue) return
    
  //   let dataFound = this.searchData.filter((val: Object) => {
  //     this.output = false;
  //     return this.compareData(searchValue, val, args) && val
  //   })
  //   //console.log(dataFound);

  //   dataFound.forEach(element => {
  //     this.modificar(element);
  //   });

  //   //console.log(dataFound);

  //   if (!searchValue || searchValue.length == 0) return

  //   this.foundData.emit([dataFound, searchValue]);
  // }

  filterData(searchValue: string, args: Array<string>) {
    console.log(args, this._globals.USER_OBJECT.idmunicipio)
    let idMuni = args[7]
    this.verifyData();
    let data =
    {
      "busqueda": searchValue,
      "idmunicipio": this._globals.USER_OBJECT.idmunicipio,
      "filtros": {
        "medico": args.find(dt => dt == 'medicos:nombres,apellidos') ? true : false,
        "empresa": args.find(dt => dt == 'nombreProvedor') ? true : false,
        "palabras_clave": true,
        "descripcion": args.find(dt => dt == 'descripcion') ? true : false,
        "nombreServicio": args.find(dt => dt == 'nombreServicio') ? true : false,
        "especialidad": args.find(dt => dt == 'nombreEspecialidad') ? true : false,
      }
    }
    if (args.length > 6) {
      data.idmunicipio = idMuni['idmunicipio'];
    }
    console.log(data)
    if (!searchValue) return
    if (!searchValue || searchValue.length == 0) return
    this._dynamicClient.postRequest('/busqueda', data).subscribe(res => {
      let data = res.body;
      // console.log(data)
      this.foundData.emit([data, searchValue]);

    });
    // return
    // if (!searchValue) return

    // let dataFound = this.searchData.filter((val: Object) => {
    //   this.output = false;
    //   return this.compareData(searchValue, val, args) && val
    // })

    // if (!searchValue || searchValue.length == 0) return

    //  this.foundData.emit([data, searchValue]);
    // // console.log(dataFound)

  }

  modificar(elemento){
    elemento.nombreServicio = elemento.nombreServicio.normalize('NFD').replace(/[\u0300-\u036f]/g,"")
    //console.log(elemento);
  }

  compareData(searchValue, data, param?): boolean {    
    if (!data) return false

    if (this.output) return true

    let tempValue;

    if (param) {
      if (param?.includes(':')) {
        let w = this.compareData(searchValue, data[param.split(':')[0]], param.split(':')[1]);
        this.output = w;
      }
      else if (param?.includes(',')) {
        let _temp = false;
        let x = !!param.split(',').find(prm => {
          _temp = !!this.compareData(searchValue, data, prm) || _temp;
          return _temp
        });
        return x;
      }
      else if (Array.isArray(param)) {
        let _temp = false;
        let z = param.forEach(dt => {
          _temp = this.compareData(searchValue, data, dt) || _temp;
          this.output = _temp;
        });
      }
      else {
        if (Array.isArray(data)) {
          let _temp = false;

          return data.find(dt => {
            _temp = this.compareData(searchValue, dt, param) || _temp;
            return _temp;
          });
        } else {
          let h = this.compareData(searchValue, data[param])
          return h;
        }
      }
    } else {
      if (typeof data == 'string') {
        tempValue = data.toLowerCase()
      }

      if (typeof data == 'number') {
        tempValue = `${data}`
      }

      if (typeof data == 'object' && !Array.isArray(data)) {
        Object.values(data).forEach(dt => {
          return this.compareData(searchValue, dt)
        });
      }

      if (Array.isArray(data)) {
        let _temp = false;
        return data.find(dt => {
          _temp = this.compareData(searchValue, dt) || _temp;
          return _temp;
        })
      }

      this.output = tempValue?.includes(searchValue.toLowerCase()) || false;
    }
    return this.output
  }
}


