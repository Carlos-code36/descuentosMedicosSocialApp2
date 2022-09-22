import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { Globals } from '@app/globals';

@Component({
  selector: 'filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
})
export class FilterComponent {

  @Input('foundData') foundData;
  @Input('listFilters') listFilters: Array<string | {}>;

  @Output() filtersSelected = new EventEmitter<Array<string | {}>>();

  public _filtersSelected: Array<string | {}> = [];

  public viewFilterBox: boolean = false;

  constructor(public _globals: Globals) {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes?.listFilters?.currentValue) {
      this._filtersSelected = changes?.listFilters?.currentValue;
    }
  }

  // ************************************************* //
  // ***************      Methods      *************** //
  // ************************************************* //

  setArguments(filter) {
    if (this._filtersSelected.includes(filter)) {
      this._filtersSelected = this._filtersSelected.filter(val => val != filter);
    } else {
      this._filtersSelected = [...this._filtersSelected, filter];
    }
  }

  setFilter(event, nameFilter?) {
    this.setArguments(nameFilter ? JSON.parse(`{"${nameFilter}":${event}}`) : event);
  }

  // resetFilters() {
  //   this.filtersSelected.emit([]);
  // }

  applyFilters() {
    this.filtersSelected.emit(this._filtersSelected);
    this.viewFilterBox = false;
  }
}
