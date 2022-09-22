import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PetsAppointmentsPage } from './pets-appointments.page';

describe('PetsAppointmentsPage', () => {
  let component: PetsAppointmentsPage;
  let fixture: ComponentFixture<PetsAppointmentsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PetsAppointmentsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PetsAppointmentsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
