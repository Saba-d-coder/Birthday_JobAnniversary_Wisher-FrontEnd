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
  isLoggedIn: boolean = false;

  constructor(private http: HttpClient) {
    this.updateCurrentUser();
  }

  updateCurrentUser(): void {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    this.loginStatus = JSON.parse(localStorage.getItem('loginStatus') || '{}');
  }

  login(data: FormData): Observable<any> {
    this.updateCurrentUser();
    return this.http.post('/api/login', data);
  }

  signup(data: FormData): Observable<any> {
    this.updateCurrentUser();
    return this.http.post('/api/signup', data);
  }

  updateUserInfo(data: FormData): Observable<any> {
    this.updateCurrentUser();
    return this.http.put(
      '/api/users/' + this.currentUser?.user['userID'],
      data,
      {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + this.currentUser?.token,
        }),
      }
    );
  }

  getUserDetails(): Observable<any> {
    this.updateCurrentUser();

    return this.http.get('/api/users/' + this.currentUser?.user['userID'], {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + this.currentUser?.token,
      }),
    });
  }

  getAllUserRequests(): Observable<any> {
    this.updateCurrentUser();
    var url: string =
      '/api/users/' + this.currentUser?.user['userID'] + '/requests';

    return this.http.get(url, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + this.currentUser?.token,
      }),
    });
  }

  sendEventWishes(to: number, data: FormData): Observable<any> {
    this.updateCurrentUser();
    return this.http.post('/api/users/' + to + '/wish', data, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + this.currentUser?.token,
      }),
    });
  }

  logout(): Observable<any> {
    this.updateCurrentUser();
    return this.http.post('/api/logout', {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + this.currentUser?.token,
      }),
    });
  }

  // service to check if user is in any team
  isInTeam(): boolean {
    this.updateCurrentUser();
    return this.currentUser.user['teamID'] ? true : false;
  }

  // service to check if user is admin
  isAdmin(): boolean {
    this.updateCurrentUser();
    return this.currentUser?.user['role'] == 'ROLE_ADMIN' ? true : false;
  }
}
