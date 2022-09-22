import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { BeneficiariesAppointmentsPage } from './beneficiaries-appointments.page';

describe('BeneficiariesAppointmentsPage', () => {
  let component: BeneficiariesAppointmentsPage;
  let fixture: ComponentFixture<BeneficiariesAppointmentsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BeneficiariesAppointmentsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(BeneficiariesAppointmentsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
