import { Injectable } from '@angular/core';
import { catchError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class UserService {

  urlBase = "https://reseau.jdedev.fr/api/user";

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient) { }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.error.mess || error.error);
  }

  login(email: string, password: string) {
    return this.http.post(`${this.urlBase}/connect`, JSON.stringify({email: email, password: password}), this.httpOptions)
      .pipe(
        catchError(this.handleError)
      )
  }

  register(email: string, pseudo: string, password: string) {
    return this.http.post(this.urlBase, JSON.stringify({pseudo: pseudo, email: email, password: password, avatar: ''}), this.httpOptions)
      .pipe(
        catchError(this.handleError)
      )
  }

  getUser(userId: Number) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('_token')}`
      })
    } as Object;

    return this.http.get(`${this.urlBase}/${userId}`, httpOptions)
      .pipe(
        catchError(this.handleError)
      )
  }

  getUsers() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('_token')}`
      })
    } as Object;

    return this.http.get(`${this.urlBase}`, httpOptions)
      .pipe(
        catchError(this.handleError)
      )
  }

  getLastArticles(userId: Number) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('_token')}`
      })
    } as Object;

    return this.http.get(`${this.urlBase}/${userId}/article`, httpOptions)
      .pipe(
        catchError(this.handleError)
      )
  }

  getLastComments(userId: Number) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('_token')}`
      })
    } as Object;

    return this.http.get(`${this.urlBase}/${userId}/comment`, httpOptions)
      .pipe(
        catchError(this.handleError)
      )
  }

  editAccount(userId: Number | undefined, pseudo: string | undefined, email: string | undefined, avatar: string | undefined){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('_token')}`
      })
    } as Object;

    return this.http.put(`${this.urlBase}/${userId}`, JSON.stringify({pseudo: pseudo, email: email, password: '', avatar: avatar}), httpOptions)
      .pipe(
        catchError(this.handleError)
      )
  }

  deleteAccount(userId: Number | undefined){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('_token')}`
      })
    } as Object;

    return this.http.delete(`${this.urlBase}/${userId}`, httpOptions)
      .pipe(
        catchError(this.handleError)
      )
  }
}
