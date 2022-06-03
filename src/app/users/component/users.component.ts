import { Component, OnInit } from '@angular/core';
import {UserService} from "../../user.service";
import { User } from '../../user/model/user';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})

export class UsersComponent implements OnInit {

  users: User[];

  constructor(private userService:UserService) {
    const that = this;
    this.users = [];
    this.userService.getUsers().subscribe({
      next(res: any[]) {
        that.users = res.reverse();
      },
      error(err) {
        alert(err);
      }
    });
  }

  ngOnInit(): void {
  }

}
