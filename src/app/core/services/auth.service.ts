import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Auth } from '../models/auth.models';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private currentUserSubject: BehaviorSubject<Auth>;
  public currentUser: Observable<Auth>;

  constructor(private http: HttpClient) { 
    this.currentUserSubject = new BehaviorSubject<Auth>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  currentUserValue(): Auth {
    return this.currentUserSubject.value;
  }

  login(email: string, password: string) {
    let params = { code: email, password: password };
    return this.http.post<any>(environment.apiURL + '/auth/login', params)
      .pipe(map(response => {
        if (response) {
          localStorage.setItem('currentUser', JSON.stringify(response.data));
          this.currentUserSubject.next(response.data);
        } return response.data;
      }));
  }

  logout() {
    let params = { token: this.getToken(), user_id: JSON.parse(localStorage.getItem('currentUser')!).user.information.id };
    return this.http.post<any>(environment.apiURL + '/auth/logout', params)
      .pipe(map(response => {
        if (response) {
          //console.log(response);
          localStorage.clear();
        } return response;
      }));
  }

  private getToken() {
    return JSON.parse(localStorage.getItem('currentUser')!).token;
  }

}
