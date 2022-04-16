import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(private http: HttpClient) { }

  getProjectsData() {
    return this.http.get<any>(environment.apiURL + '/projects/');
  }

  saveProject(body: any) {
    return this.http.post<any>(environment.apiURL + '/projects/save', body);
  }

}
