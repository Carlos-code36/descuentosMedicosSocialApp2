import { Globals } from '@app/globals';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'card-pet',
  templateUrl: './card-pet.component.html',
  styleUrls: ['./card-pet.component.scss'],
})
export class CardPetComponent implements OnInit {
  @Input() pet;

  constructor(
    private globals: Globals
  ) { }

  ngOnInit() {}

}
