import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import {Document} from "../components/add-document-component/add-document-component"

@Injectable({
  providedIn: 'root'
})
export class DocumentService{
  private baseUrl = 'http://localhost/src/controllers/document_controller.php';

  constructor(private http: HttpClient) {}

  getAllDocuments(): Observable<Document[]>{
    const params = new HttpParams().set('action', 'getAllDocuments');
    return this.http.get<Document[]>(this.baseUrl, {params});
  }

  addDocument(document: any): Observable<any>{
    const body = new FormData();
    body.append('action', 'addDocument');
    body.append('document', JSON.stringify(document));
    console.log(body);
    return this.http.post(this.baseUrl, body);
  }

  getDocuments(filter: string = 'all', value: string = ''): Observable<Document[]> {
    let params = new HttpParams().set('action', 'getDocuments').set('filter', filter);
    if (value) {
      params = params.set('filter_value', value);
    }
    return this.http.get<Document[]>(this.baseUrl, { params });
  }

  deleteDocument(id: number): Observable<any> {
    const body = new FormData();
    body.append('action', 'deleteDocument');
    body.append('id', id.toString());
    return this.http.post(this.baseUrl, body);
}

}