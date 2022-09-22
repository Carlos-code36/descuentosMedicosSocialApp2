import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'capitalCase'
})
export class CapitalCasePipe implements PipeTransform {

    transform(value: any): string {        
        return `${value.substr(0, 1).toUpperCase()}${value.substr(1).toLowerCase()}`;
    }
}