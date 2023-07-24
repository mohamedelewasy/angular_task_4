import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/auth/auth.service';

export const isAuthenticatedGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const toastr = inject(ToastrService);

  if (!authService.isLoggedIn()) {
    router.navigate(['/auth/signin']);
    return false;
  } else {
    authService.verify().subscribe(
      () => null,
      (err) => {
        authService.removeToken();
        toastr.error(err.error.message, 'please signin again.', {
          timeOut: 5000,
        });
        router.navigate(['/auth/signin']);
        return false;
      }
    );
  }
  return true;
};
