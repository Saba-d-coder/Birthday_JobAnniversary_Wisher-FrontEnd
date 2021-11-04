import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserService } from './user.service';
import { map } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TeamService {
  currentUser: any;

  constructor(private http: HttpClient) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
  }

  getTeamMembers() {
    return this.http
      .get('/api/teams/' + this.currentUser?.user['teamID'] + '/members', {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + this.currentUser?.token,
        }),
      })
      .pipe(
        map((response: any) => {
          return response;
        })
      );
  }

  getTeamDetails(): Observable<any> {
    return this.http
      .get('/api/teams/' + this.currentUser?.user['teamID'], {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + this.currentUser?.token,
        }),
      })
      .pipe(
        map((response: any) => {
          return response;
        })
      );
  }

  getUpcomingEvents() {
    return this.http
      .get(
        '/api/teams/' + this.currentUser?.user['teamID'] + '/upcomingEvents',
        {
          headers: new HttpHeaders({
            Authorization: 'Bearer ' + this.currentUser?.token,
          }),
        }
      )
      .pipe(
        map((response: any) => {
          return response;
        })
      );
  }
}
