import { Pipe, PipeTransform } from '@angular/core';
import { Globals } from './../globals';

@Pipe({
    name: 'speciality'
})
export class SpecialityPipe implements PipeTransform {

    constructor(private _globals: Globals) { }

    transform(idSpeciality: any): string {        
        return this._globals.SPECIALITIES.find(sp => sp.idEspecialidad == idSpeciality)['nombreEspecialidad'].split('-')[1];
    }

}