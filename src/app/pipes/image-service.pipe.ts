import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from "@angular/platform-browser";
import { environment } from 'src/environments/environment';

@Pipe({
  name: 'imageServices'
})
export class ImageServicesPipe implements PipeTransform {

  constructor(private sanitizer: DomSanitizer) { }

  transform(value) {
    let url = `${environment.apiUrl}/imagenservicio/${value}`;
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}
