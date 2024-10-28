import { Component, inject, OnInit } from '@angular/core';

import { HeaderComponent } from './header/header.component';
import { UsersComponent } from './users/users.component';
import { RouterLink, RouterOutlet } from '@angular/router';
import { AuthService } from './users/user/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  imports: [HeaderComponent, UsersComponent, RouterOutlet],
})
export class AppComponent implements OnInit {
  private authService = inject(AuthService);

  ngOnInit() {
    this.authService.login('authorized');
  }
}
