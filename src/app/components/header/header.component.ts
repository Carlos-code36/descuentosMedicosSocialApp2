import { NavController, Platform } from '@ionic/angular';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  @Input('buttonsRight') buttonsRight: boolean = true;
  @Input('linkEdit') linkEdit: string = '';
  @Input('onlyBack') onlyBack = false;
  @Input('showEdit') showEdit: boolean = false;
  @Input('showMenu') showMenu: boolean = true;
  @Input('showSearch') showSearch: boolean = false;
  @Input('showSettings') showSettings: boolean = false;
  @Input('showFilterPage') showFilterPage: boolean = false;
  @Input('showSearchPage') showSearchPage: boolean = false;
  @Input('title') title: string;
  @Input('back') back: boolean = true;
  @Input('noBack') noBack: boolean = false;
  @Input('defaultBack') defaultBack;
  @Input('showTitle') showTitle: boolean = true;

  @Output('onBack') onBack = new EventEmitter<boolean>();
  @Output('onEdit') onEdit = new EventEmitter<boolean>();
  @Output('onSearch') onSearch = new EventEmitter<boolean>();
  @Output('onFilter') onFilter = new EventEmitter<boolean>();

  hideTitle: boolean = false;
  hideSearch: boolean = false;

  constructor(
    private router: Router,
    private platform: Platform,
    private navCtrl: NavController,
  ) {
    this.platform.backButton.subscribeWithPriority(10, (proccessNextHandler) => this.goToBack());
  }

  showSearchBar(newPage?) {
    if (newPage) {
      this.onSearch.emit(true);
      this.router.navigate(['/search-publications']);
    } else {
      this.hideTitle = true;
      this.hideSearch = true;
      this.onSearch.emit(true);
    }
  }

  showFilter(newPage?) {
    this.onFilter.emit(true);
    // this.router.navigate(['/search-publications']);
  }

  onEditEvent() {
    console.log('edit mode clicked!');
    if (!this.linkEdit) return;
    this.router.navigate([this.linkEdit]);
    this.onEdit.emit(true);
  }

  onSettingsEvent() {
    console.log('Settings clicked!');
  }

  goToBack() {
    this.onBack.emit(true);

    if (this.noBack) return;

    if (this.defaultBack) {
      this.navCtrl.navigateBack(`${this.defaultBack}`);
    } else {
      this.navCtrl.back()
    }
  }

  public hideSearchBar(): void {
    this.hideTitle = false;
    this.hideSearch = false;
  }
}
