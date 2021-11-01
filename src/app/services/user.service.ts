import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Form } from '@angular/forms';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  // to check if user is logged in
  isLoggedIn: boolean = false;
  authToken: string = '';

  login(data: FormData): Observable<any> {
    return this.http.post('/api/login', data);
  }

  loggedIn(): void {
    this.isLoggedIn = !this.isLoggedIn;
  }

  setAuthToken(token: string) {
    this.authToken = token;
  }

  signup(data: FormData): Observable<any> {
    return this.http.post('/api/signup', data);
  }

  logout() {
    return this.http.post('/api/logout', this.authToken, {
      headers: new HttpHeaders({ Authorization: 'Bearer ' + this.authToken }),
    });
  }

  // service to check if user is in any team
  inTeam(): boolean {
    return true;
  }

  // service to check if user is admin
  isAdmin(): boolean {
    return true;
  }
}
