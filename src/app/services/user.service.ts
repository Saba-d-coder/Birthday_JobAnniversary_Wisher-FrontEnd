import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Form } from '@angular/forms';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  currentUser: any;
  loginStatus: any;

  constructor(private http: HttpClient) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    this.loginStatus = JSON.parse(localStorage.getItem('loginStatus') || '{}');
    console.log(this.loginStatus?.isLoggedIn);
  }

  // authToken: string =
  //   //wrong 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJLUiiCJleHAiOjE2MzU5MzEyODUsImlhdCI6MTYzNTg0NDg4NX0.tSstxTkcThcoMrJWobL6BqPw4zglmvp-1Wey-cn-rHg';
  //   //expired 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJLU0siLCJleHAiOjE2MzU5MzEyODUsImlhdCI6MTYzNTg0NDg4NX0.tSstxTkcThcoMrJWobL6BqPw4zglmvp-1Wey-cn-rHg';
  //   'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJLU0siLCJleHAiOjE2MzYwMjE3MTAsImlhdCI6MTYzNTkzNTMxMH0.ce2mu2WC19_qTfapfR8JzQ9ReS63qIVlGCNVQ4ExQRs';

  login(data: FormData): Observable<any> {
    return this.http.post('/api/login', data);
  }

  signup(data: FormData): Observable<any> {
    return this.http.post('/api/signup', data);
  }

  getUserDetails(): Observable<any> {
    // endpoint: string = '/api/users/' + this.userID;;
    console.log('/api/users/' + this.currentUser?.user['userID']);

    return this.http
      .get('/api/users/' + this.currentUser?.user['userID'], {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + this.currentUser?.token,
        }),
      })
      .pipe(
        map((response: any) => {
          return response.data;
        })
      );
  }

  getAllUserRequests(): Observable<any> {
    var url: string =
      '/api/users/' + this.currentUser?.user['userID'] + '/requests';

    console.log(url);

    return this.http.get(url, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + this.currentUser?.token,
      }),
    });
  }

  sendEventWishes(to: number, data: FormData) {
    return this.http.post('/api/users/' + to + '/wish', data, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + this.currentUser?.token,
      }),
    });
  }

  logout() {
    return this.http.post('/api/logout', {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + this.currentUser?.token,
      }),
    });
  }

  // service to check if user is in any team
  inTeam(): boolean {
    return this.currentUser?.user['teamID'] ? true : false;
  }

  // service to check if user is admin
  isAdmin(): boolean {
    return this.currentUser?.user['role'] == 'ROLE_ADMIN' ? true : false;
  }
}
