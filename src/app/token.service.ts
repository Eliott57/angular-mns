import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor() { }

  getToken(){
    return localStorage.getItem('_token') || null;
  }

  setToken(_token: string){
    localStorage.setItem('_token', _token);
  }
}
