import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  constructor(private http: HttpClient, public userService: UserService) {}

  getAllRequests() {
    this.userService.updateCurrentUser();
    return this.http.get('/api/admin/requests', {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + this.userService.currentUser?.token,
      }),
    });
  }

  getAllPendingRequests() {
    return this.http.get('/api/admin/requests/pending', {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + this.userService.currentUser?.token,
      }),
    });
  }

  approveRequest(requestID: number) {
    var url: string = 'api/admin/requests/' + requestID + '/approve';

    return this.http.get(url, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + this.userService.currentUser?.token,
      }),
    });
  }

  declineRequest(requestID: number) {
    var url: string = 'api/admin/requests/' + requestID + '/decline';

    return this.http.get(url, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + this.userService.currentUser?.token,
      }),
    });
  }
}
