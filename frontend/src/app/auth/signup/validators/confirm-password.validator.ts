import {
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms';

export function passwordConfirmVal(form: FormGroup): ValidationErrors | null {
  const password = form.get('password');
  const passwordConfirm = form.get('passwordConfirm');
  if (passwordConfirm?.dirty && password?.value !== passwordConfirm.value)
    passwordConfirm?.setErrors({ wrong: true });
  else passwordConfirm?.setErrors(null);
  return null;
}
