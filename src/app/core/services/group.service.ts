import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GroupService {

  constructor(private http: HttpClient) { }

  getGroupsData() {
    return this.http.get<any>(environment.apiURL + '/group/');
  }

  saveGroup(body: any) {
    return this.http.post<any>(environment.apiURL + '/group/save', body);
  }

  getMyGroup(body: any) {
    return this.http.get<any>(environment.apiURL + '/group/mygroup', body);
  }

}
