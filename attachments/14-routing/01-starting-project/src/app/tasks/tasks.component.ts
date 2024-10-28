import {
  Component,
  computed,
  DestroyRef,
  inject,
  input,
  OnInit,
  signal,
} from '@angular/core';

import { TaskComponent } from './task/task.component';
import { Task } from './task/task.model';
import { TasksService } from './tasks.service';
import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  ResolveFn,
  RouterLink,
  RouterStateSnapshot,
} from '@angular/router';

@Component({
  selector: 'app-tasks',
  standalone: true,
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css',
  imports: [TaskComponent, RouterLink],
})
export class TasksComponent {
  order = input<'asc' | 'desc'>('desc');
  userTasks = input.required<Task[]>();
}

export const resolveUserTasks: ResolveFn<Task[]> = (
  activatedRouteSnapshot: ActivatedRouteSnapshot,
  routerState: RouterStateSnapshot
) => {
  const tasksService = inject(TasksService);
  const order: string = activatedRouteSnapshot.queryParams['order'];
  activatedRouteSnapshot.params;
  const tasks = tasksService
    .allTasks()
    .filter(
      (task: Task) =>
        task.userId === activatedRouteSnapshot.paramMap.get('userId')!
    );
  if (order && order === 'asc') {
    tasks.sort((a, b) => (a.id < b.id ? -1 : 1));
  } else {
    tasks.sort((a, b) => (a.id < b.id ? 1 : -1));
  }

  return tasks.length ? tasks : [];
};
