import { Directive, ElementRef, Input, Renderer2, ViewChild } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[validate]',
  host: {
    '(ionBlur)': 'onBlur()'
  }
})
export class ValidationFormDirective {
  @Input() set no_validate(_no_validate) {
    // console.log(_no_validate);
  }

  nextNode;
  parentNode;
  errorsNode;

  constructor(
    private elRef: ElementRef,
    private renderer: Renderer2,
    private formControl: NgControl
  ) {
    // console.debug('%c Validation directive initialized', 'background: #222; color: #badaff');
  }

  ngOnInit() {
    this.parentNode = this.renderer.parentNode(this.elRef.nativeElement);
    this.nextNode = this.renderer.nextSibling(this.parentNode);

    this.formControl.valueChanges.subscribe(() => {

      let tmpNodeInput = (this.parentNode as HTMLElement).getElementsByTagName('ion-input')[0]
      let tmpIconInput = tmpNodeInput.getElementsByTagName('ion-icon')[0]

      if (tmpIconInput) this.renderer.removeChild(tmpNodeInput, tmpIconInput);

      let errorContainer = document.getElementById('error-container') as HTMLDivElement;

      if (this.formControl.touched) {
        this.setSuccesfully();
      }

      if (errorContainer) {
        this.renderer.removeChild(this.parentNode.parentNode, errorContainer);
      }

      if (this.formControl.errors && this.formControl.touched) {
        this.errorsNode = this.renderer.createElement('div');
        this.renderer.setAttribute(this.errorsNode, 'id', 'error-container');
        Object.entries(this.formControl.errors).forEach(err => this.setError(err));

        // setTimeout(() => this.showErrors(), 1000);
        this.showErrors();
      } else if (this.formControl.valid && this.elRef.nativeElement.childElementCount <= 1) {
        let iconSuccess = this.renderer.createElement('ion-icon');
        this.renderer.setAttribute(iconSuccess, 'name', 'checkmark-circle-outline');
        this.renderer.appendChild(this.elRef.nativeElement, iconSuccess);
        this.renderer.setStyle(iconSuccess, 'color', '#27ae60')
        this.renderer.setStyle(iconSuccess, 'font-size', '1.9em')
        this.renderer.setStyle(iconSuccess, 'position', 'relative')
      }
    });
  }

  onBlur() {
    let errorContainer = document.getElementById('error-container') as HTMLDivElement;

    if (errorContainer) {
      this.renderer.removeChild(this.parentNode.parentNode, errorContainer);
    }

    if (this.formControl.errors) {
      this.errorsNode = this.renderer.createElement('div');
      this.renderer.setAttribute(this.errorsNode, 'id', 'error-container');
      Object.entries(this.formControl.errors).forEach(err => this.setError(err));

      setTimeout(() => this.showErrors(), 500);
    }
  }

  setError(error) {
    let errorText = '';

    switch (error[0]) {
      case 'required':
        errorText = `* El campo es requerido.`;
        break;
      case 'minlength':
        errorText = `* Debe ingresar mínimo ${error[1].requiredLength} caracteres.`;
        break;
      case 'maxlength':
        errorText = `* No debe ingresar mas de ${error[1].requiredLength} caracteres.`;
        break;
      case 'pattern':
        errorText = `* Debe ingresar solo letras.`;
        break;
      case 'min':
        errorText = `* Debe ingresar un valor mayor o igual a ${error[1].min}.`;
        break;
      case 'max':
        errorText = `* Debe ingresar un valor menor o igual a ${error[1].max}.`;
        break;
      case 'email':
        errorText = `* El correo ingresado es invalido.`;
        break;
      case 'different':
        errorText = `* Las contraseñas no coinciden.`;
        break;
      case 'emailExist':
        errorText = `* El correo ya se encuentra registrado.`;
        break;
      default:
        break;
    }

    // Message container //
    let spanElement = this.renderer.createElement('span');
    this.renderer.setStyle(spanElement, 'display', 'block');
    this.renderer.addClass(spanElement, 'error');

    // Asterisk red //
    let strongElement = this.renderer.createElement('strong');
    this.renderer.setStyle(strongElement, 'color', '#c0392b');
    // this.renderer.appendChild(strongElement, this.renderer.createText('* '));

    // Icon (not used now) //
    let iconElement = this.renderer.createElement('ion-icon');
    if (this.formControl.control.errors && this.elRef.nativeElement.childElementCount <= 1) {
      this.renderer.setAttribute(iconElement, 'name', 'close-circle-outline');
      this.renderer.appendChild(this.elRef.nativeElement, iconElement);
      this.renderer.setStyle(iconElement, 'color', '#c0392b')
      this.renderer.setStyle(iconElement, 'font-size', '1.9em')
    }

    // Building component //
    this.renderer.appendChild(spanElement, strongElement);
    this.renderer.appendChild(spanElement, this.renderer.createText(errorText));
    this.renderer.appendChild(this.errorsNode, spanElement);
  }

  showErrors() {
    console.debug('showErrors executed');
    console.debug(this.parentNode);
    console.debug(this.errorsNode);
    // this.renderer.appendChild(this.parentNode, this.errorsNode);
    this.renderer.insertBefore(this.parentNode.parentNode, this.errorsNode, this.nextNode);
  }

  setSuccesfully() {
    let iconElement = this.renderer.createElement('ion-icon');
    this.renderer.setProperty(iconElement, 'name', 'checkmark-circle-outline');

    /* let iconSuccess = this.renderer.createElement('ion-icon');
    this.renderer.setAttribute(iconSuccess, 'name', 'checkmark-circle-outline');
    this.renderer.insertBefore(this.elRef.nativeElement, iconSuccess, this.nextNode)
    this.renderer.setStyle(iconSuccess, 'color', '#27ae60')
    this.renderer.setStyle(iconSuccess, 'font-size', '1.9em') */
  }

}