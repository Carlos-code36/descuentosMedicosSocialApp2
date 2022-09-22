import { environment } from './../../environments/environment';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'coverPageImage'
})
export class CoverPageImagePipe implements PipeTransform {

  transform(value, type: string = 'person') {
    let defaulCover = type == 'doctor' ? 'portada_medico.png' : 'background_default.jpeg';

    if (Array.isArray(value)) {
      value = value.find(img => (img.tipo == 'portada' && img.favorita == 1));
    } else if (value instanceof Object) {
      value = value.avatar == 'background_default.jpeg' ? null : defaulCover;
    }

    return `${environment.apiUrl}/avatar/${value?.path || value || defaulCover}`;
  }
}
