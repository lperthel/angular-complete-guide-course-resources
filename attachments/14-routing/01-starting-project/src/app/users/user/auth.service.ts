import { inject, Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  RedirectCommand,
  Route,
  Router,
  UrlSegment,
} from '@angular/router';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isLoggedIn = false;
  private userRole: string | null = null;

  // Simulate a login
  login(role: string): void {
    console.log('Logging in user with role = ', role);
    this.isLoggedIn = true;
    this.userRole = role;
  }

  // Simulate a logout
  logout(): void {
    this.isLoggedIn = false;
    this.userRole = null;
  }

  // Check if the user is logged in
  isAuthenticated(): boolean {
    return this.isLoggedIn;
  }

  // Check the user's role for authorization
  hasRole(role: string): boolean {
    return this.userRole === role;
  }
}

export const isUserAuthenticatedAndAuthorized = (
  route: Route,
  segments: UrlSegment[]
) => {
  const router = inject(Router);
  const authService = inject(AuthService);
  const redirectPage = new RedirectCommand(router.parseUrl('/unathorized'));
  if (!authService.isAuthenticated()) {
    console.log('user in not Authenticated. Redirecting...');
    return redirectPage;
  }

  // Check if the user has the required role
  const requiredRole = route.data?.['role'];
  console.log('requiredRole = ', requiredRole);
  if (requiredRole && !authService.hasRole(requiredRole)) {
    console.log('user does not have required role. Redirecting...');
    return false;
  }

  return true;
};
