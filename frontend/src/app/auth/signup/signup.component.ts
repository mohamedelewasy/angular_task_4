import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { passwordConfirmVal } from './validators/confirm-password.validator';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent {
  signupForm!: FormGroup;
  username!: FormControl;
  password!: FormControl;
  passwordConfirm!: FormControl;

  constructor(private authService: AuthService, private router: Router) {
    if (authService.isLoggedIn()) router.navigate(['/']);

    this.username = new FormControl<string>('', Validators.required);
    this.password = new FormControl<string>('', Validators.required);
    this.passwordConfirm = new FormControl<string>('', Validators.required);

    this.signupForm = new FormGroup(
      {
        username: this.username,
        password: this.password,
        passwordConfirm: this.passwordConfirm,
      },
      [Validators.required, passwordConfirmVal]
    );
  }

  submit() {
    const { username, password } = this.signupForm.value;
    this.authService
      .signup(username, password)
      .subscribe((res) => this.router.navigate(['auth/signin']));
  }
}
