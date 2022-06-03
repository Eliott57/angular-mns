import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private readonly location: Location) {
  }

  getLocation = () => {
    return this.location.path();
  }

  ngOnInit(): void {
  }

  userConnected(){
    if(localStorage.getItem('_token')) return true;
    return false;
  }

  disconnect(){
    localStorage.removeItem('_token');
    localStorage.removeItem('user_id');
    window.location.href = '/login';
  }
}
