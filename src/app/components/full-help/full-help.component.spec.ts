import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FullHelpComponent } from './full-help.component';

describe('FullHelpComponent', () => {
  let component: FullHelpComponent;
  let fixture: ComponentFixture<FullHelpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FullHelpComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FullHelpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
