import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  constructor(private http: HttpClient) { }

  getCompaniesData() {
    return this.http.get<any>(environment.apiURL + '/companies/');
  }

  saveCompany(body: any) {
    return this.http.post<any>(environment.apiURL + '/companies/save', body);
  }

}
