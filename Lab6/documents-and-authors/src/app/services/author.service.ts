import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Author } from '../components/list-authors-component/list-authors-component';
import { API } from '../../constants/api';

@Injectable({
  providedIn: 'root'
})
export class AuthorService {

  private baseUrl = API.authors;
  
  constructor(private http: HttpClient) {}

  getAllAuthors(): Observable<Author[]> {
    const params = new HttpParams().set('action', 'getAllAuthors');
    return this.http.get<Author[]>(this.baseUrl, { params });
  }

  addAuthor(author: any): Observable<any> {
    const body = new FormData();
    body.append('action', 'addAuthor');
    body.append('author', JSON.stringify(author));

    return this.http.post(this.baseUrl, body);
  }
}