import { Component } from '@angular/core';
import { Globals } from '@app/globals';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage {
  tabs: Array<Object> = [
    {
      path: 'login',
      label: 'Ingresar',
    },
    {
      path: 'register',
      label: 'Registrarse',
    }
  ];

  constructor(
    private menuController: MenuController,
    public _globals: Globals
  ) {
    console.debug('%c Auth page initialized', 'background: #222; color: #bada55');
    this.menuController.enable(false);
  }
}
