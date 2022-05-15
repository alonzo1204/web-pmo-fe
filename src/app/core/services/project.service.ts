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

  saveMasiveRegister(body: any) {
    return this.http.post<any>(environment.apiURL + '/projects/saveExcel', body);
  }

  acceptProject(idProject: any) {
    return this.http.post<any>(environment.apiURL + '/projects/aceptar/idProject=' + idProject, {});
  }

  deniedProject(idProject: any) {
    return this.http.post<any>(environment.apiURL + '/projects/denegar/idProject=' + idProject, {});
  }

  getProjectsbyStatus(idState: any) {
    return this.http.get<any>(environment.apiURL + '/projects/?idState=' + idState);
  }

  getProjectsbyStatusVarius(idState: any) {
    return this.http.get<any>(environment.apiURL + '/projects/status/' + idState);
  }

  saveTeachers(body: any) {
    return this.http.post<any>(environment.apiURL + '/projects/save_teachers', body);
  }

  getMyRequestsEdits() {
    return this.http.get<any>(environment.apiURL + '/projects/my_request_edits');
  }

  getAllRequestsEdits() {
    return this.http.get<any>(environment.apiURL + '/projects/all_request_edits');
  }

  saveRequestEdits(body: any) {
    return this.http.post<any>(environment.apiURL + '/projects/save_request_edits', body);
  }
}
