import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserService } from './user.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class TeamService {
  constructor(private http: HttpClient, private userService: UserService) {}

  teamID: number = 100;

  getTeamMembers() {
    return this.http
      .get('/api/teams/' + this.teamID + '/members', {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + this.userService.authToken,
        }),
      })
      .pipe(
        map((response: any) => {
          console.log(response.data);
          return response.data;
        })
      );
  }

  getTeamDetails() {
    return this.http
      .get('/api/teams/' + this.teamID, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + this.userService.authToken,
        }),
      })
      .pipe(
        map((response: any) => {
          console.log(response.data);
          return response.data;
        })
      );
  }

  getUpcomingEvents() {
    return this.http
      .get('/api/teams/' + this.teamID + '/upcomingEvents', {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + this.userService.authToken,
        }),
      })
      .pipe(
        map((response: any) => {
          console.log(response.data);
          return response.data;
        })
      );
  }
}
