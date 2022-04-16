import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PortfolioService {

  constructor(private http: HttpClient) { }

  getPortfoliosData() {
    return this.http.get<any>(environment.apiURL + '/portfolios/');
  }

  savePortfolio(body: any) {
    return this.http.post<any>(environment.apiURL + '/portfolios/save', body);
  }

}
