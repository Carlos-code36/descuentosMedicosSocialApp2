import { Component, OnInit } from '@angular/core';
import { IonTabs } from '@ionic/angular';

@Component({
  selector: 'app-home-tabs',
  templateUrl: './home-tabs.page.html',
  styleUrls: ['./home-tabs.page.scss'],
})
export class HomeTabsPage implements OnInit{

  constructor() { }

  selectTab() {
    // console.log('selected tab now');
  }
  ngOnInit(): void {
    let links = document.querySelectorAll('.link__page');
    let buble = document.querySelector('.buble') as HTMLElement;

    links.forEach(el => {
      el.addEventListener('click', (e) => {
        document.querySelector('.link__page.active').classList.remove('active')
        el.classList.add('active');

        buble.style.left = `${el['offsetLeft']+20 }px`
      })
    })  }



}
