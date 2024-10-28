import { Component, inject, Input, input, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { TasksService } from '../tasks.service';
import {
  CanDeactivateFn,
  NavigationError,
  Router,
  RouterLink,
} from '@angular/router';
import { compileNgModule } from '@angular/compiler';

@Component({
  selector: 'app-new-task',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './new-task.component.html',
  styleUrl: './new-task.component.css',
})
export class NewTaskComponent {
  userId = input.required<string>();
  enteredTitle = signal('');
  enteredSummary = signal('');
  enteredDate = signal('');
  submitted = false;
  private tasksService = inject(TasksService);
  private router = inject(Router);
  private activatedRoute = inject(Router);

  onSubmit() {
    const sub = this.router.events.pipe().subscribe({
      next: (val) => {
        if (val instanceof NavigationError) {
          console.error(val.error);
        }
      },
    });

    this.tasksService.addTask(
      {
        title: this.enteredTitle(),
        summary: this.enteredSummary(),
        date: this.enteredDate(),
      },
      this.userId()
    );
    this.submitted = true;
    this.router.navigate(['users/', this.userId(), 'tasks'], {
      replaceUrl: true,
    });
  }
}

export const canLeaveEditPage: CanDeactivateFn<NewTaskComponent> = (
  component
) => {
  if (component.submitted) return true;
  if (
    component.enteredTitle() ||
    component.enteredDate() ||
    component.enteredSummary()
  ) {
    console.log('running window.confirm');
    return window.confirm(
      'Do you really want to leave? you will lose the entered data.'
    );
  }

  return true;
};
