import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CareerService {

  constructor(private http: HttpClient) { }

  getCareersData() {
    return this.http.get<any>(environment.apiURL + '/careers/')
  }

  saveCareer(body: any) {
    return this.http.post<any>(environment.apiURL + '/careers/save', body);
  }

}
