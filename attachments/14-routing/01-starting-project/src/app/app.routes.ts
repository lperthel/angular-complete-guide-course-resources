import {
  ActivatedRouteSnapshot,
  CanMatchFn,
  RedirectCommand,
  Route,
  Router,
  Routes,
  UrlSegment,
} from '@angular/router';
import { TasksComponent } from './tasks/tasks.component';
import { NoTaskComponent } from './tasks/no-task/no-task.component';
import {
  resolvePageTitle,
  ressolveUserName,
  UserTasksComponent,
} from './users/user-tasks/user-tasks.component';
import { NewTaskComponent } from './tasks/new-task/new-task.component';
import { NotFoundComponent } from '../not-found/not-found.component';
import { userRoutes } from './users/users.routes';
import { inject } from '@angular/core';
import { isUserAuthenticatedAndAuthorized } from './users/user/auth.service';

const dummyCanMatch: CanMatchFn = (route: Route, segments: UrlSegment[]) => {
  const router = inject(Router);
  console.log(segments);
  const shouldGetAccess = Math.random();
  if (shouldGetAccess < 0.5) {
    return true;
  }
  return new RedirectCommand(router.parseUrl('/unathorized'));
};

export const routes: Routes = [
  {
    path: '',
    component: NoTaskComponent,
    title: 'No Task Selected',
  },
  {
    path: 'users/:userId',
    component: UserTasksComponent,
    children: userRoutes,
    canMatch: [isUserAuthenticatedAndAuthorized],
    data: {
      message: 'Hello',
      role: 'authorized',
    },
    resolve: {
      userName: ressolveUserName,
    },
    title: resolvePageTitle,
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
];
