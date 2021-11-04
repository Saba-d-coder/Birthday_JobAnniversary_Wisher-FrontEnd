import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  currentUser: any;

  constructor(private http: HttpClient, private userService: UserService) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
  }

  teamID: number = 100;

  getAllRequests() {
    return this.http
      .get('/api/admin/requests', {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + this.currentUser?.token,
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
