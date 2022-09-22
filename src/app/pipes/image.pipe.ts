import { Pipe, PipeTransform } from '@angular/core';
import { environment } from 'src/environments/environment';

@Pipe({
  name: 'image'
})
export class ImagePipe implements PipeTransform {

  transform(value, type: string = 'person') {
    //console.log(value);
    
    let defaulProfile;

    if (type == 'doctor') defaulProfile = 'medico.png';
    else if (type == 'pet') defaulProfile = 'undefined_pet.png';
    else defaulProfile = 'avatarundefined.png';

    if (Array.isArray(value)) {
      //console.log(value);
      value = [...value].find(img => (img.tipo == 'avatar' && img.favorita == 1));
    } else if (value instanceof Object) {
      value = value.avatar == 'avatarundefined.png' ? null : defaulProfile;
    }
    //console.log(`${environment.apiUrl}/avatar/${value?.path || value || defaulProfile}`);

    return `${environment.apiUrl}/avatar/${value?.path || value || defaulProfile}`;
  }
}