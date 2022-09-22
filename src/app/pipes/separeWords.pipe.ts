import { TitleCasePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'separeWords'
})
export class SepareWordsPipe implements PipeTransform {

    constructor(
        private _titleCase: TitleCasePipe
    ) { }

    transform(value): any {
        let temp = value.match(/^([a-z]+)(([A-Z]([a-z]+))+)$/);
        return temp ? temp.slice(1, -2).map(el => this._titleCase.transform(el)).join(' ') : this._titleCase.transform(value);
    }
}
