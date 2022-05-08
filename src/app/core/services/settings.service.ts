import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  constructor(private http: HttpClient) { }

  getSetting(id: number) {
    return this.http.get<any>(environment.apiURL + '/config/' + id);
  }

  editSetting(id: number, body: any) {
    return this.http.post<any>(environment.apiURL + '/config/edit/' + id, body);
  }

}
