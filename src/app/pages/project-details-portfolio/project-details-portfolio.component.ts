import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-project-details-portfolio',
  templateUrl: './project-details-portfolio.component.html',
  styleUrls: ['./project-details-portfolio.component.scss']
})
export class ProjectDetailsPortfolioComponent implements OnInit {
  project: any;
  projects: any[] = [];
  titlecode: string = "";
  isLoaded: boolean = false;
  breadCrumbItems: Array<{}>;

  constructor(private route: ActivatedRoute, private http: HttpClient) { }

  ngOnInit(): void {
    this.breadCrumbItems = [{ label: 'Postulación' }, { label: 'Cartera de Proyectos' }, { label: 'Detalles', active: true }];
    var code = this.route.snapshot.params.code;
    this.titlecode = "Detalles del Proyecto " + code;
    this.getProjectsData().subscribe(data => {
      this.projects = Object.values(data)[0];
      this.project = this.projects.filter(function(data){ return data.code == code })[0];
      this.isLoaded = true;
    });
  }

  getProjectsData() {
    return this.http.get("http://localhost:3000/api/v1.0/projects");
  }
}
