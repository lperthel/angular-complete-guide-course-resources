import { Injectable } from '@angular/core';

import { DUMMY_USERS } from '../../dummy-users';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  get users() {
    return DUMMY_USERS;
  }

  getUser(userId: string) {
    return DUMMY_USERS.find((user) => user.id === userId);
  }
}
