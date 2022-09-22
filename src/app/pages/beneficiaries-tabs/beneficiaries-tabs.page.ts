import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-beneficiaries-tabs',
  templateUrl: './beneficiaries-tabs.page.html',
  styleUrls: ['./beneficiaries-tabs.page.scss'],
})
export class BeneficiariesTabsPage implements OnInit {

  constructor() { }

  selectTab() {
    // console.log('selected tab now');
  }

  ngOnInit() {
    let links = document.querySelectorAll('.link__pages');
    let buble = document.querySelector('.bubles') as HTMLElement;

    links.forEach(el => {
      el.addEventListener('click', (e) => {
        document.querySelector('.link__pages.active').classList.remove('active')
        el.classList.add('active');

        buble.style.left = `${el['offsetLeft'] + 42}px`
      })
    })
  }

}
