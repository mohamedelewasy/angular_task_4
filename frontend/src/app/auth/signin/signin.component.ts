import { Component, OnChanges, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css'],
})
export class SigninComponent {
  signinForm!: FormGroup;
  username!: FormControl;
  password!: FormControl;
  constructor(private authService: AuthService, private router: Router) {
    if (authService.isLoggedIn()) router.navigate(['/']);
    this.username = new FormControl('', Validators.required);
    this.password = new FormControl('', Validators.required);
    this.signinForm = new FormGroup({
      username: this.username,
      password: this.password,
    });
  }

  submit() {
    const { username, password } = this.signinForm.value;
    this.authService.signin(username, password).subscribe((data) => {
      this.authService.saveToken(data.token);
      this.router.navigate(['/']);
    });
  }
}
