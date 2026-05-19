import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment";
import { API } from "../../constants/api";

@Injectable({
  providedIn: 'root'
})
export class LoginService{

  constructor(private http: HttpClient) {}

  login(username: string, password: string) {
    return this.http.post<any>(
      API.login,
      {
        username,
        password
      }
    );
  }
  logout() {
    localStorage.removeItem('token');
  }
  register(username: string, password: string) {
    return this.http.post<any>(
      API.register,
      {
        username,
        password
      }
    );
  }
}