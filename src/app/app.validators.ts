import { Injector } from "@angular/core";
import { FormControl, FormGroup, ValidationErrors, ValidatorFn } from "@angular/forms"
import { Router } from "@angular/router";
import { AuthService } from "./services";

export const validatorPasswords: ValidatorFn = (control: FormControl): ValidationErrors | null => {
  let formGroup: FormGroup = control.parent as FormGroup;

  if (formGroup == undefined) return null;

  let password = formGroup.get("password");
  let passwordConfirm = formGroup.get("passwordConfirm");

  if (!(password.dirty && passwordConfirm.dirty)) return null;

  return password.value === passwordConfirm.value ? null : { different: true };
}

const injector = Injector.create({
  providers: [{
    provide: AuthService
  },
  {
    provide: Router
  }]
});



export const validatorEMailExist: ValidatorFn = (control: FormControl): ValidationErrors | null => {
  let email = control.value;
  // console.log(email);

  // if (_authService) {
  //   _authService.verifyEmail(email).then(rs => {
  //     console.log(rs);
  //   });
  // }

  return null;
  return { emailExist: true };

  // if (!(password.dirty && passwordConfirm.dirty)) return null;

  // return password.value === passwordConfirm.value ? null : { different: true };
}

