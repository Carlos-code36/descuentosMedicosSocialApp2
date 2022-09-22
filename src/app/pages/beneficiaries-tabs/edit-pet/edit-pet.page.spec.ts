import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EditPetPage } from './edit-pet.page';

describe('EditPetPage', () => {
  let component: EditPetPage;
  let fixture: ComponentFixture<EditPetPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditPetPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EditPetPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
