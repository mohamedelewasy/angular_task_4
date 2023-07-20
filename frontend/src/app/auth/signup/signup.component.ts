import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent {
  signupForm!: FormGroup;
  constructor(private authService: AuthService, private router: Router) {
    if (authService.isLoggedIn()) router.navigate(['/']);

    this.signupForm = new FormGroup({
      username: new FormControl<string>(''),
      password: new FormControl<string>(''),
    });
  }

  submit() {
    const { username, password } = this.signupForm.value;
    this.authService
      .signup(username, password)
      .subscribe((res) => this.router.navigate(['auth/signin']));
  }
}
