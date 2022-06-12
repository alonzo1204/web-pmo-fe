import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PostulationService {

  constructor(private http: HttpClient) { }

  getPostulationsData() {
    return this.http.get<any>(environment.apiURL + '/postulations/');
  }

  savePostulation(body: any) {
    return this.http.post<any>(environment.apiURL + '/postulations/save', body);
  }

  getMyPostulations(code: string) {
    return this.http.get<any>(environment.apiURL + '/postulations/mypostulations/' + code);
  }

  getHistoryPostulation(body: any) {
    return this.http.post<any>(environment.apiURL + '/postulations/history', body);
  }

  asignProyects() {
    return this.http.get<any>(environment.apiURL + '/postulations/asign')
  }

}
