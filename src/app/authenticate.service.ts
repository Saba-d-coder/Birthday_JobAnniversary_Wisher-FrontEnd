import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthenticateService {
  constructor(private httpClient: HttpClient) {}

  authenticateSignIn(username: String, password: String): Observable<any> {
    let jsonBody = {
      username: username,
      password: password,
    };

    return this.httpClient.post('api/authenticate', jsonBody);
  }
}
