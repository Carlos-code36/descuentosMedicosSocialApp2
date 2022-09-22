import { NgModule } from '@angular/core';
import { NoPreloading, RouterModule, Routes } from '@angular/router';

import { LoginGuard, NologinGuard, SliderGuard, ValidationsGuard } from './guards';

// import { BeneficiaryResolver } from './resolvers/beneficiary.resolver';

const routes: Routes = [
  { path: '', redirectTo: 'slide-show', pathMatch: 'full' },

  { path: 'slide-show', loadChildren: './pages/slide-show/slide-show.module#SlideShowPageModule', canActivate: [SliderGuard] },
  { path: 'about-products', loadChildren: './pages/about-products/about-products.module#AboutProductsPageModule' },

  // Authentication
  { path: 'auth', loadChildren: './pages/auth/auth.module#AuthPageModule', canActivate: [NologinGuard] },
  { path: 'validate-account/:type_validation', loadChildren: './pages/validate-account/validate-account.module#ValidateAccountPageModule', canActivate: [LoginGuard] },
  { path: 'change-password', loadChildren: './pages/change-password/change-password.module#ChangePasswordPageModule', canActivate: [LoginGuard] },
  { path: 'recover-password', loadChildren: './pages/recover-password/recover-password.module#RecoverPasswordPageModule', canActivate: [NologinGuard] },

  // Main page
  { path: 'home', loadChildren: './pages/home-tabs/home-tabs.module#HomeTabsPageModule', canActivate: [LoginGuard] },

  // Profile
  { path: 'preview-profile', loadChildren: './pages/preview-profile/preview-profile.module#PreviewProfilePageModule', canActivate: [LoginGuard] },
  { path: 'update-profile', loadChildren: './pages/profile/profile.module#ProfilePageModule', canActivate: [LoginGuard] },

  // Beneficiaries
  { path: 'beneficiaries-tabs', loadChildren: './pages/beneficiaries-tabs/beneficiaries-tabs.module#BeneficiariesTabsPageModule', canActivate: [LoginGuard, ValidationsGuard] },

  // Appointments
  { path: 'appointments', loadChildren: './pages/appointments/appointments.module#AppointmentsPageModule', canActivate: [LoginGuard, ValidationsGuard] },

  { path: 'full-screen-slide', loadChildren: './components/full-screen-slide/full-screen-slide.module#FullScreenSlidePageModule' },

  // { path: 'appointments-doctor', loadChildren: './pages/appointments-doctor/appointments-doctor.module#AppointmentsDoctorPageModule' },
  { path: 'doctor-services', loadChildren: './pages/doctor-services/doctor-services.module#DoctorServicesPageModule', canActivate: [LoginGuard, ValidationsGuard]  },
  { path: 'appointments-doctor/:id_service', loadChildren: './pages/appointments-doctor/appointments-doctor.module#AppointmentsDoctorPageModule' },
  { path: 'doctor-profile/:id_members', loadChildren: './pages/doctor-profile/doctor-profile.module#DoctorProfilePageModule' },

  { path: 'beneficiaries/create/:group_type/:group_id/:group_name', loadChildren: './pages/beneficiaries-tabs/add-beneficiary/add-beneficiary.module#AddBeneficiaryPageModule', canActivate: [LoginGuard, ValidationsGuard] },
  { path: 'beneficiaries/edit/:id_members', loadChildren: './pages/beneficiaries-tabs/edit-beneficiary/edit-beneficiary.module#EditBeneficiaryPageModule', canActivate: [LoginGuard, ValidationsGuard] },
  { path: 'pets/edit/:id_pet', loadChildren: './pages/beneficiaries-tabs/edit-pet/edit-pet.module#EditPetPageModule', canActivate: [LoginGuard, ValidationsGuard] },
  // { path: 'beneficiaries', loadChildren: './pages/beneficiaries/beneficiaries.module#BeneficiariesPageModule', canActivate: [LoginGuard, ValidationsGuard] },

  { path: 'terms-and-conditions', loadChildren: './pages/terms-and-conditions/terms-and-conditions.module#TermsAndConditionsPageModule' },
  { path: 'contact', loadChildren: './pages/contact/contact.module#ContactPageModule' },
  { path: 'full-data-provider/:id_members', loadChildren: './pages/full-data-provider/full-data-provider.module#FullDataProviderPageModule' },
  { path: 'search-publications', loadChildren: './pages/search-publications/search-publications.module#SearchPublicationsPageModule' },

  // { path: 'menu', loadChildren: './pages/home/home.module#HomePageModule' },
  // { path: 'publications', loadChildren: './pages/home-tabs/publications/publications.module#PublicationsPageModule' },
  // { path: 'profile', loadChildren: './pages/preview-profile/preview-profile.module#PreviewProfilePageModule', canActivate: [ValidationsGuard] },
  // { path: '', redirectTo: '/home/publications', pathMatch: 'full' }
]



// { path: 'beneficiaries/:group_id', loadChildren: './pages/beneficiaries/beneficiaries.module#BeneficiariesPageModule', canActivate: [LoginGuard] },

// { path: 'pets/:group_id', loadChildren: './pages/pets/pets.module#PetsPageModule', canActivate: [LoginGuard] },

// { path: 'beneficiaries/detail/:group_id/:beneficiary_id', loadChildren: './pages/beneficiary-detail/beneficiary-detail.module#BeneficiaryDetailPageModule', canActivate: [LoginGuard] },

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: NoPreloading })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
