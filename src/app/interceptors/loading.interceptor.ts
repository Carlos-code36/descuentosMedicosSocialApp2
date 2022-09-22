import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { finalize } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { GlobalDataService, UtilitiesService } from '@app/services';

// import { NzMessageService } from 'ng-zorro-antd';

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {
  private countRequest = 0;

  constructor(
    private _utilitiesService: UtilitiesService
  ) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let url = !request.url.includes('/verificar/') && !request.url.includes('/member/')&& 
      !request.url.includes('/busqueda')&& !request.url.includes('/serviciosmuni')&&
      !request.url.includes('/medicosactivosprov')&& !request.url.includes('/sucursales')&& 
      !request.url.includes('/serviciosactivosempresa') && !request.url.includes('/subservicio') && 
      !request.url.includes('/identificacion') && !request.url.includes('/servicio');

    if (!this.countRequest && url) {
      this._utilitiesService.showLoader();
    }
    this.countRequest++;
    return next.handle(request).pipe(
      finalize(async () => {
        this.countRequest--;
        if (!this.countRequest && url) {
          this._utilitiesService.closeLoader();
        }
      })
    );
  }
}