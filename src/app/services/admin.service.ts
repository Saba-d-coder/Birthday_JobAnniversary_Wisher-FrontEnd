import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  currentUser: any;

  constructor(private http: HttpClient) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
  }

  teamID: number = 100;

  getAllRequests() {
    return this.http.get('/api/admin/requests', {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + this.currentUser?.token,
      }),
    });
  }

  getAllPendingRequests() {
    return this.http.get('/api/admin/requests/pending', {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + this.currentUser?.token,
      }),
    });
  }

  approveRequest(requestID: number) {
    var url: string = 'api/admin/requests/' + requestID + '/approve';

    return this.http.get(url, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + this.currentUser?.token,
      }),
    });
  }

  declineRequest(requestID: number) {
    var url: string = 'api/admin/requests/' + requestID + '/decline';

    return this.http.get(url, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + this.currentUser?.token,
      }),
    });
  }
}
