import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../models/user.model';
import { UserService } from '../../services/user.service';
import { MessageService } from 'src/services/message.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  users: User[];

  constructor(private userService: UserService, private messageService: MessageService, private router: Router) { }

  ngOnInit() {
    this.loginForm = new FormGroup({
      username: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required)
    });
  }

  onClick() {
    this.login();
  }

  login() {
    const username = this.loginForm.get('username').value;
    const password = this.loginForm.get('password').value;

    const userDetails = this.userService.getUsers().find(user => user.username === username && user.password === password);

    if (userDetails) {
      this.userService.loggedInUserSubject.next(userDetails.username);
      this.router.navigate(['dashboard']);
    } else {
      this.messageService.clear();
      this.messageService.addMessage({severity: 'error', summary: 'Error: ', detail: 'Incorrect username or password!'});
      this.loginForm.reset();
    }
  }
}
