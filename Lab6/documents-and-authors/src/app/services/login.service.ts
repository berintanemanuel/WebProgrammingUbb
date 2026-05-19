import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class LoginService{

  constructor(private http: HttpClient) {}

  login(username: string, password: string) {
    return this.http.post<any>(
      environment.apiLoginUrl,
      {
        username,
        password
      }
    );
  }
  logout() {
    localStorage.removeItem('token');
  }
}