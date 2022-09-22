import { PublicationsService } from '@app/services';
import { Component, OnInit, Output, ViewChild, EventEmitter, Input } from '@angular/core';
import { Globals } from '@app/globals';

@Component({
  selector: 'department-selector',
  templateUrl: './department-selector.component.html',
  styleUrls: ['./department-selector.component.scss'],
})
export class DepartmentSelectorComponent {
  @ViewChild('selectorDepartment') selectorDepartment: HTMLInputElement;

  @Input('color') color: string = '#bccee1';
  @Input('customClass') customClass: string;

  @Output() departmentSelected = new EventEmitter<number>();

  filteredPublications
  departmentsAndTowns;
  listPublications;
  member;

  constructor(
    public _globals: Globals
  ) {}

  ngAfterViewInit() {
    // this.departmentSelected.emit(13301)
    // this.selectorDepartment.value = 'PASTO - NARIÑO';
    this.getInfo()
  }

  async getInfo() {
    this.member = this._globals.USER_OBJECT;
    if (this.member.idmunicipio != 1) {
      let municipio = this.member.municipio;
      let idmunicipio = this.member.idmunicipio;
      this.departmentSelected.emit(idmunicipio)
      this.selectorDepartment.value = municipio;
    }
    else {
      this.departmentSelected.emit(13301)
      this.selectorDepartment.value = 'PASTO - NARIÑO';
    }
  }

  focusDropdownSearch() {
    this.selectorDepartment.value = '';
    this.searchDeptMun();
  }

  blurDropdownSearch() {
    setTimeout(() => {
      this.departmentsAndTowns = undefined;
    }, 20);
  }

  searchDeptMun() {
    this.departmentsAndTowns = this._globals.DEPARTMENTSANDMUNI.filter(el => {
      let mun = el.nombreMunicipio.toLowerCase();
      let dep = el.nombreDepartamento.toLowerCase();
      
      if (mun.includes(this.selectorDepartment.value.toLowerCase()) || dep.includes(this.selectorDepartment.value.toLowerCase())) {
        return true
      };
    })
  }

  selectDeptMun(target: HTMLElement) {
    let idDepMun = target.getAttribute('data-depmun-id');
    let nameDepMun = target.getAttribute('data-depmun-name');
    this.selectorDepartment.value = nameDepMun;

    this.departmentSelected.emit(parseInt(idDepMun));

    this.blurDropdownSearch();
  }
}
