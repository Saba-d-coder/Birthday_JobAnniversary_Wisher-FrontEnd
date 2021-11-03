import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  constructor(private http: HttpClient, private userService: UserService) {}

  teamID: number = 100;

  getAllRequests() {
    return this.http.get('/api/admin/requests', {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + this.userService.authToken,
      }),
    });
  }

  getAllPendingRequests() {
    return this.http.get('/api/admin/requests/pending', {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + this.userService.authToken,
      }),
    });
  }

  approveRequest(requestID: number) {
    var url: string = 'api/admin/requests/' + requestID + '/approve';

    return this.http.get(url, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + this.userService.authToken,
      }),
    });
  }

  declineRequest(requestID: number) {
    var url: string = 'api/admin/requests/' + requestID + '/decline';

    return this.http.get(url, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + this.userService.authToken,
      }),
    });
  }
}
