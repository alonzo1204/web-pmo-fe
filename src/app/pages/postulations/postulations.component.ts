import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-postulations',
  templateUrl: './postulations.component.html',
  styleUrls: ['./postulations.component.scss']
})
export class PostulationsComponent implements OnInit {
  postulations: any[] = [];
  breadCrumbItems: Array<{}>;

  constructor(private router: Router, private http: HttpClient) { }

  gotodetails(id) {
    this.router.navigate(['/project-details/'+this.postulations[id].code]);
  }

  getProjectsData() {
    return this.http.get("http://localhost:30/api/v1.0/projects");
  }

  ngOnInit(): void {
    this.breadCrumbItems = [{ label: 'Postulaciones Cerradas' }, { label: 'Proyectos Cerrados', active: true }];
    this.getProjectsData().subscribe(data => {
      this.postulations = Object.values(data)[0];
    });
  }

}
