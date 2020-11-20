import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class UserService {
  constructor(private readonly http: HttpClient) {}

  login(user: any): Observable<any> {
    let url = 'http://localhost:8080/login';
    let body = JSON.stringify(user);

    return this.http.post(url, body, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      observe: 'response',
    });
  }

  getAllUsers(): Observable<any> {
    return this.http.get('http://localhost:8080/fetchAllUsers');
  }

  addUser(user: any): Observable<any> {
    return this.http.get('http://localhost:8080/registration/' + user);
  }
}
