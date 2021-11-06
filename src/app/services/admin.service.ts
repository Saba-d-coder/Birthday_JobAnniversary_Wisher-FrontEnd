import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  constructor(private http: HttpClient, private userService: UserService) {}

  getAllRequests(): Observable<any> {
    this.userService.updateCurrentUser();
    return this.http.get('/api/admin/requests', {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + this.userService.currentUser?.token,
      }),
    });
  }

  getAllPendingRequests(userID: number): Observable<any> {
    this.userService.updateCurrentUser();
    return this.http.get('/api/admin/' + userID + '/requests/pending', {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + this.userService.currentUser?.token,
      }),
    });
  }

  approveRequest(requestID: number): Observable<any> {
    this.userService.updateCurrentUser();
    var url: string = 'api/admin/requests/approve';

    return this.http.post(url, requestID, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + this.userService.currentUser?.token,
      }),
    });
  }

  declineRequest(requestID: number): Observable<any> {
    this.userService.updateCurrentUser();
    var url: string = 'api/admin/requests/decline';

    return this.http.post(url, requestID, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + this.userService.currentUser?.token,
      }),
    });
  }

  removeTeamMember(id: number): Observable<any> {
    this.userService.updateCurrentUser();
    var url: string = 'api/admin/users/removeFromTeam';

    return this.http.post(url, id, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + this.userService.currentUser?.token,
      }),
    });
  }
}
