import { Component, DestroyRef, inject, input, OnInit } from '@angular/core';
import { UsersService } from '../users.service';
import {
  RouterOutlet,
  RouterLink,
  ResolveFn,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  ActivatedRoute,
  Router,
  NavigationError,
  UrlSegment,
} from '@angular/router';
import { AuthService } from '../user/auth.service';

@Component({
  selector: 'app-user-tasks',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  templateUrl: './user-tasks.component.html',
  styleUrl: './user-tasks.component.css',
})
export class UserTasksComponent implements OnInit {
  message = input.required<string>();
  userName = input.required<string>();
  private activatedRoute = inject(ActivatedRoute);
  private authService = inject(AuthService);
  private router = inject(Router);
  private destroyRef = inject(DestroyRef);

  ngOnInit(): void {
    const segments: UrlSegment[] = [new UrlSegment('products', { id: '42' })];

    const sub1 = this.activatedRoute.data.subscribe({
      next: (data) => {
        console.log('route data = ', data);
      },
    });

    this.router.routerState;

    const urlTree = this.router.parseUrl(this.router.url);
    urlTree.queryParams;

    this.destroyRef.onDestroy(() => {
      // sub2.unsubscribe();
      sub1.unsubscribe();
    });
  }
}

export const ressolveUserName: ResolveFn<string> = (
  activatedRoute: ActivatedRouteSnapshot,
  routerState: RouterStateSnapshot
) => {
  const usersService = inject(UsersService);
  return (
    usersService.users.find(
      (user) => user.id === activatedRoute.paramMap.get('userId')
    )?.name || ''
  );
};

export const resolvePageTitle: ResolveFn<string> = (
  activatedRoute: ActivatedRouteSnapshot,
  routerState: RouterStateSnapshot
) => {
  return ressolveUserName(activatedRoute, routerState) + "'s Task List";
};
