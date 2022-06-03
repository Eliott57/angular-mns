import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {catchError} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  urlBase = "https://reseau.jdedev.fr/api/comment";

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

  addComment(articleId: Number, comment: string){
    return this.http.post(`${this.urlBase}`, JSON.stringify({idArt: articleId, contenu: comment}), this.httpOptions)
      .pipe(
        catchError(this.handleError)
      )
  }

  deleteComment(commentId: Number){
    return this.http.delete(`${this.urlBase}/${commentId}`, this.httpOptions)
      .pipe(
        catchError(this.handleError)
      )
  }

  editComment(commentId: Number, comment: string){
    return this.http.put(`${this.urlBase}/${commentId}`, JSON.stringify({contenu: comment}), this.httpOptions)
      .pipe(
        catchError(this.handleError)
      )
  }
}
