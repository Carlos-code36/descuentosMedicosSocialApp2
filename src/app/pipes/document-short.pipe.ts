import { Pipe, PipeTransform } from '@angular/core';
import { Globals } from './../globals';

@Pipe({
    name: 'documentShort'
})
export class DocumentShortPipe implements PipeTransform {

    constructor(private _globals: Globals) { }

    transform(idTypeDocument: any): string {
        return this._globals.DOCUMENTYPES.find(type_doc => type_doc.idtipoDocumentos == idTypeDocument)['tipo'];
    }
}