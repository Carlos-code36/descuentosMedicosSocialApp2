import { IndividualRateComponent } from './individual-rate/individual-rate.component';
import { RateComponent } from './rate/rate.component';
import { ModalProductsComponent } from './modal-products/modal-products.component';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule, registerLocaleData } from "@angular/common";
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';

import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import localeEs from "@angular/common/locales/es";

import { ModalDetailAppoinmentComponent } from './modal-detail-appoinment/modal-detail-appoinment.component';
import { ModalDetailDoctorComponent } from './modal-detail-doctor/modal-detail-doctor.component';
import { ModalDetailServicesComponent } from './modal-detail-services/modal-detail-services.component';
import { ModalVerifyDataComponent } from "./modal-verify-data/modal-verify-data.component";
import { ModalCertificadoComponent } from './modal-certificado/modal-certificado.component';
import { ModalCertificadoServicioComponent } from './modal-certificado-servicio/modal-certificado-servicio.component';
import { ModalCarnetComponent } from './modal-carnet/modal-carnet.component';
import { ModalReciboComponent } from './modal-recibo/modal-recibo.component';
import { CardBeneficiaryComponent } from './card-beneficiary/card-beneficiary.component';
import { AvatarProviderComponent } from './avatar-provider/avatar-provider.component';
import { SlidePublicityComponent } from './slide-publicity/slide-publicity.component';
import { ModalTemplateComponent } from './modal-template/modal-template.component';
import { FullScreenSlidePage } from './full-screen-slide/full-screen-slide.page';
import { AvatarUserComponent } from './avatar-user/avatar-user.component';
import { TimeLineComponent } from './time-line/time-line.component';
import { CalendarComponent } from './calendar/calendar.component';
import { CardPetComponent } from './card-pet/card-pet.component';
import { HeaderComponent } from './header/header.component';

import { UtilitiesService, UserService } from '@app/services';
//import { PDFGenerator } from "@ionic-native/pdf-generator/ngx";

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { PipesModule } from '@pipes/pipes.module';
import { DepartmentSelectorComponent } from "./department-selector/department-selector.component";
import { FinderComponent } from "./finder/finder.component";
import { FilterComponent } from "./filter/filter.component";
import { FullHelpComponent } from './full-help/full-help.component';
import { ModalValidateAccountComponent } from './modal-validate-account/modal-validate-account.component';
import { ModalRateServiceComponent } from './modal-rate-service/modal-rate-service.component';
import { DirectivesModule } from '@app/directives/directives.module';

const listComponents = [
  ModalDetailAppoinmentComponent,
  ModalValidateAccountComponent,
  DepartmentSelectorComponent,
  ModalDetailDoctorComponent,
  ModalDetailServicesComponent,
  ModalRateServiceComponent,
  ModalVerifyDataComponent,
  ModalCertificadoComponent,
  ModalCertificadoServicioComponent,
  ModalCarnetComponent,
  ModalReciboComponent,
  CardBeneficiaryComponent,
  AvatarProviderComponent,
  SlidePublicityComponent,
  IndividualRateComponent,
  ModalProductsComponent,
  ModalTemplateComponent,
  FullScreenSlidePage,
  AvatarUserComponent,
  CalendarComponent,
  FullHelpComponent,
  TimeLineComponent,
  CardPetComponent,
  FilterComponent,
  FinderComponent,
  HeaderComponent,
  RateComponent
]

registerLocaleData(localeEs);

@NgModule({
  declarations: [...listComponents],
  exports: [...listComponents],
  imports: [
    PipesModule,
    IonicModule,
    CommonModule,
    RouterModule,
    DirectivesModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory
    }),
  ],
  providers: [
    AvatarProviderComponent,
    UtilitiesService,
    UserService,
    //PDFGenerator
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ComponentsModule { }
