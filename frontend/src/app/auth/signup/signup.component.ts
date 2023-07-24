import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { passwordConfirmVal } from './validators/confirm-password.validator';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

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
  errorMessage!: string;

  constructor(
    private authService: AuthService,
    private router: Router,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService
  ) {
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
    this.spinner.show();
    const { username, password } = this.signupForm.value;
    this.authService.signup(username, password).subscribe(
      (res) => {
        this.spinner.hide();
        this.router.navigate(['auth/signin']);
        this.toastr.success('signup successfully');
      },
      (err) => {
        this.errorMessage = err.error.message;
        this.spinner.hide();
      }
    );
  }
}
