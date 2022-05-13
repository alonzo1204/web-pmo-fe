import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getUsersData() {
    return this.http.get<any>(environment.apiURL + '/users/');
  }

  saveUser(body: any) {
    return this.http.post<any>(environment.apiURL + '/auth/register', body);
  }

  saveMasiveRegister(body: any) {
    return this.http.post<any>(environment.apiURL + '/users/registroMasivo', body);
  }

  saveMasiveRegisterLocked(body: any) {
    return this.http.post<any>(environment.apiURL + '/users/registroMasivoB', body);
  }

}
