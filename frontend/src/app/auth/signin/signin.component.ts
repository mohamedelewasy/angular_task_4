import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css'],
})
export class SigninComponent {
  signinForm!: FormGroup;
  constructor(private authService: AuthService, private router: Router) {
    if (authService.isLoggedIn()) router.navigate(['/']);
    this.signinForm = new FormGroup({
      username: new FormControl<string>(''),
      password: new FormControl<string>(''),
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
