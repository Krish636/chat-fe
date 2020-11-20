import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable()
export class UserGuard implements CanActivate {
  responseCode: any;
  isUserLoggedIn: string | undefined;
  constructor(private router: Router) {
    this.isUserLoggedIn = sessionStorage.getItem('authorization')!;
  }
  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    if (
      this.isUserLoggedIn !== null &&
      this.isUserLoggedIn !== undefined &&
      this.isUserLoggedIn !== ''
    ) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
