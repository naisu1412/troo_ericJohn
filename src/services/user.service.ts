import { User } from '../models/user.model';
import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private user: User[] = [
    { username: 'user', password: 'password' },
    { username: 'admin', password: 'password' }
  ];

  loggedInUserSubject = new ReplaySubject<string>();

  constructor() {
   }

  getUsers() {
    return this.user.slice();
  }
}
