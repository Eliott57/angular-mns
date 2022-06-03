import { Component, OnInit } from '@angular/core';
import { UserService } from "../../user.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email: string;
  password: string;

  constructor(private userService: UserService) {
    this.email = '';
    this.password = '';
  }

  ngOnInit(): void {
  }

  login(){
    this.userService.login(this.email, this.password).subscribe({
      next(res) {
        localStorage.setItem('_token', res.token);
        localStorage.setItem('user_id', res.id);
        window.location.href = '/articles';
      },
      error(err) {
        alert(err);
      }
    });
  }
}
