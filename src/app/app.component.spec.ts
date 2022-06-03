import {inject, TestBed} from '@angular/core/testing';
import {
  HttpClientTestingModule, HttpTestingController
} from '@angular/common/http/testing';
import { CommentService } from './comment.service';
import { TokenService } from './token.service';
import {of} from "rxjs";
import {HttpClient, HttpClientModule} from "@angular/common/http";

const spyDataService = jasmine.createSpyObj('TokenService', ['getToken']);
spyDataService.getToken.and.returnValue(of('eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzI4LCJuaXZlYXUiOjEsImlhdCI6MTY1NDIzOTkyOCwiZXhwIjoxNjU0MjQ3MTI4fQ.NAVeXraqcaRrdD4fJ4jJWSaBkspLnuP3aT0kvVE-qqQQ-rOnrqglsbVYtWNWrhUWcqyIMnBJ0Gq63jC4WGfuYg'));

describe('CommentService', () => {

  let service: CommentService;
  let http: HttpClient;
  let backend: HttpTestingController

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        HttpClientTestingModule
      ],
      providers: [CommentService, {
        provide: TokenService,
        useValue: spyDataService
      }]
    });
  });

  beforeEach(inject([CommentService, HttpClient, HttpTestingController], (
    conf: CommentService,
    _h: HttpClient,
    _b: HttpTestingController
  ) => {
    service = conf;
    http = _h;
    backend = _b;
  }));

  afterEach(inject([HttpTestingController], (httpMock: HttpTestingController) => {
    httpMock.verify();
  }));

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add comment', () => {

    service.addComment(223, 'Commentaire de test').subscribe(res => {
      expect(res.contenu).toBe("Commentaire de test");
    });

    const req = backend.expectOne({
      url: 'https://reseau.jdedev.fr/api/comment',
      method: 'POST'
    });

    req.flush({
      "id_article": 223,
      "contenu": "Commentaire de test",
      "token": "eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzI4LCJuaXZlYXUiOjEsImlhdCI6MTY1NDIzOTkyOCwiZXhwIjoxNjU0MjQ3MTI4fQ.NAVeXraqcaRrdD4fJ4jJWSaBkspLnuP3aT0kvVE-qqQQ-rOnrqglsbVYtWNWrhUWcqyIMnBJ0Gq63jC4WGfuYg"
    }, { status: 200, statusText: 'ok' });
  });

  it('should delete comment', () => {
    service.deleteComment(264).subscribe(res => {
      console.log(res)
    });

    const req = backend.expectOne({
      url: 'https://reseau.jdedev.fr/api/comment/264',
      method: 'DELETE'
    });

    req.flush({
      "id_commentaire": 264,
      "token": "eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzI4LCJuaXZlYXUiOjEsImlhdCI6MTY1NDIzOTkyOCwiZXhwIjoxNjU0MjQ3MTI4fQ.NAVeXraqcaRrdD4fJ4jJWSaBkspLnuP3aT0kvVE-qqQQ-rOnrqglsbVYtWNWrhUWcqyIMnBJ0Gq63jC4WGfuYg"
    }, { status: 200, statusText: 'ok' });
  });
});

