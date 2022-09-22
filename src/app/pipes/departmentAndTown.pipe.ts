import { Pipe, PipeTransform } from '@angular/core';
import { Globals } from './../globals';

@Pipe({
    name: 'departmentAndTown'
})
export class DepartmentAndTownPipe implements PipeTransform {

    constructor(private _globals: Globals) { }

    transform(id_dep_mun: any): string {
        let dept = this._globals.DEPARTMENTSANDMUNI.find(depts => depts.idmunicipio == id_dep_mun)
        return dept ? `${dept.nombreMunicipio}, ${dept.nombreDepartamento}` : 'Nó existe';
    }
}