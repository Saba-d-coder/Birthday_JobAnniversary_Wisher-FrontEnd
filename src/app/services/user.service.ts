import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Form } from '@angular/forms';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  // to check if user is logged in
  isLoggedIn: boolean = false;
  authToken: string =
    'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJLU0siLCJleHAiOjE2MzYwODA2MjksImlhdCI6MTYzNTk5NDIyOX0.qrvSePQK4dUK6t3bVtTfnS_4erNsc-fm3eixAfhCPc8';
  userID: number = 100001;

  login(data: FormData): Observable<any> {
    return this.http.post('/api/login', data);
  }

  setAuthToken(token: string) {
    this.authToken = token;
  }

  signup(data: FormData): Observable<any> {
    return this.http.post('/api/signup', data);
  }

  getUserDetails(): Observable<any> {
    // endpoint: string = '/api/users/' + this.userID;;

    console.log('/api/users/' + this.userID);

    return this.http
      .get('/api/users/' + this.userID, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + this.authToken,
        }),
      })
      .pipe(
        map((response: any) => {
          console.log(response.data);
          return response.data;
        })
      );
  }

  getAllUserRequests(): Observable<any> {
    var url: string = '/api/users/' + this.userID + '/requests';

    console.log(url);

    return this.http.get(url, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + this.authToken,
      }),
    });
  }

  logout() {
    return this.http.post('/api/logout', {
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
