import { FormGroup, AbstractControl } from '@angular/forms';

// To validate password and confirm password
export function AbreviaturaValida(marcado: string, abreviatura: string) {
  return (formGroup: FormGroup) => {
    const marcadoControl = formGroup.controls[marcado];
    const abreviaturaControl = formGroup.controls[abreviatura];

    if (!marcadoControl.value) {
      return;
    } else {
      if (abreviaturaControl.value === '') {
        abreviaturaControl.setErrors({required: true});
      } else {
        abreviaturaControl.setErrors(null);
      }
    }
  };
}
