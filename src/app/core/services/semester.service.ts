import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SemesterService {

  constructor(private http: HttpClient) { }

  getSemestersData() {
    return this.http.get<any>(environment.apiURL + '/semester/');
  }

  saveSemester(body: any) {
    return this.http.post<any>(environment.apiURL + '/semester/save', body);
  }

}
