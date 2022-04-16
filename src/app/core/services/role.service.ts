import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  constructor(private http: HttpClient) { }

  getRolesData() {
    return this.http.get<any>(environment.apiURL + '/roles/');
  }

  saveRole(body: any) {
    return this.http.post<any>(environment.apiURL + '/roles/save', body);
  }

}
