import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {catchError} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  urlBase = "https://reseau.jdedev.fr/api/article";

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('_token')}`
    })
  };

  constructor(private http: HttpClient) { }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.error.mess || error.error);
  }

  getArticles() {
    return this.http.get(`${this.urlBase}`, this.httpOptions)
      .pipe(
        catchError(this.handleError)
      )
  }

  getComments(articleId: Number) {
    return this.http.get(`${this.urlBase}/${articleId}/comment`, this.httpOptions)
      .pipe(
        catchError(this.handleError)
      )
  }

  addArticle(title: string, content: string) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('_token')}`
      })
    } as Object;

    return this.http.post(`${this.urlBase}`, JSON.stringify({titre: title, contenu: content}), httpOptions)
      .pipe(
        catchError(this.handleError)
      )
  }

  deleteArticle(articleId: Number) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('_token')}`
      })
    } as Object;

    return this.http.delete(`${this.urlBase}/${articleId}`, httpOptions)
      .pipe(
        catchError(this.handleError)
      )
  }

  editArticle(articleId: Number, title: string, content: string) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('_token')}`
      })
    } as Object;

    return this.http.put(`${this.urlBase}/${articleId}`, JSON.stringify({titre: title, contenu: content}), httpOptions)
      .pipe(
        catchError(this.handleError)
      )
  }
}
