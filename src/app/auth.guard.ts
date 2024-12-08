import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { LoginService } from './services/login.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private loginService: LoginService, private router: Router) { }


  canActivate(route: ActivatedRouteSnapshot): boolean {
    const userRole = localStorage.getItem('role');  // Retrieve role from localStorage

    // Check if the user is logged in and has a valid token
    if (this.loginService.hasTokenExpired()) {
      this.loginService.logout();  // Log out the user if the token has expired
      this.router.navigate(['home']);  // Redirect to the login page
      return false;
    }

    // Retrieve the expected role from the route data
    const expectedRole = route.data['role'];

    // Check if the user has the correct role for the route
    if (userRole === expectedRole) {
      return true;  // Allow access to the route if the role matches
    } else {
      this.loginService.logout();
      // If the user doesn't have the correct role, redirect to a different page
      this.router.navigate(['home']);  // Redirect to home or unauthorized page
      return false;  // Prevent access to the route
    }
  }
}
