import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class TeamService {
  constructor(private http: HttpClient, private userService: UserService) {}

  getTeamMembers() {
    this.userService.updateCurrentUser();
    return this.http
      .get(
        '/api/teams/' +
          this.userService.currentUser?.user['teamID'] +
          '/members',
        {
          headers: new HttpHeaders({
            Authorization: 'Bearer ' + this.userService.currentUser?.token,
          }),
        }
      )
      .pipe(
        map((response: any) => {
          return response;
        })
      );
  }

  getTeamDetails(): Observable<any> {
    this.userService.updateCurrentUser();
    return this.http
      .get('/api/teams/' + this.userService.currentUser?.user['teamID'], {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + this.userService.currentUser?.token,
        }),
      })
      .pipe(
        map((response: any) => {
          return response;
        })
      );
  }

  getUpcomingEvents() {
    this.userService.updateCurrentUser();
    return this.http
      .get(
        '/api/teams/' +
          this.userService.currentUser?.user['teamID'] +
          '/upcomingEvents',
        {
          headers: new HttpHeaders({
            Authorization: 'Bearer ' + this.userService.currentUser?.token,
          }),
        }
      )
      .pipe(
        map((response: any) => {
          return response;
        })
      );
  }

  getAllTeams() {
    this.userService.updateCurrentUser();
    return this.http
      .get('/api/teams', {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + this.userService.currentUser?.token,
        }),
      })
      .pipe(
        map((response: any) => {
          return response;
        })
      );
  }

  getAllTeamsData() {
    this.userService.updateCurrentUser();
    return this.http
      .get('/api/teams/data', {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + this.userService.currentUser?.token,
        }),
      })
      .pipe(
        map((response: any) => {
          return response;
        })
      );
  }

  requestToJoinTeam(userID: number, teamID: number) {
    this.userService.updateCurrentUser();
    return this.http.post(
      '/api/users/' + userID + '/teamChangeRequest/' + teamID,
      null,
      {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + this.userService.currentUser?.token,
        }),
      }
    );
  }
}
