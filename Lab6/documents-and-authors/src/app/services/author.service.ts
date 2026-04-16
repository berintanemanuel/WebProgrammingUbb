import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthorService {

  private baseUrl = 'http://localhost/src/controllers/author_controller.php';

  constructor(private http: HttpClient) {}

  getAllAuthors(): Observable<any> {
    const params = new HttpParams().set('action', 'getAllAuthors');
    return this.http.get(this.baseUrl, { params });
  }

  addAuthor(author: any): Observable<any> {
    const body = new FormData();
    body.append('action', 'addAuthor');
    body.append('author', JSON.stringify(author));

    return this.http.post(this.baseUrl, body);
  }
}