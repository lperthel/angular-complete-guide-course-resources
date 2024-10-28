import {
  Component,
  DestroyRef,
  effect,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { interval, map } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  private destroyRef = inject(DestroyRef);
  clickCount = signal(0);

  constructor() {
    effect(() => {
      console.log(`Clicked button ${this.clickCount()} times`);
    });
  }

  ngOnInit() {
    const subcription = interval(1000)
      .pipe(map((val) => val * 2))
      .subscribe({
        next: (value) => console.log(value),
        complete: () => console.log('complete'),
      });
    this.destroyRef.onDestroy(() => {
      subcription.unsubscribe();
    });
  }
  onClick() {
    this.clickCount.update((prevCount) => prevCount + 1);
  }
}
