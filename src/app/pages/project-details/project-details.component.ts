import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.scss']
})
export class ProjectDetailsComponent implements OnInit {
  project: any;
  projects: any[] = [];
  isLoaded: Boolean = false;
  breadCrumbItems: Array<{}>;

  constructor(private route: ActivatedRoute, private router: Router, private http: HttpClient) { }

  ngOnInit(): void {
    this.breadCrumbItems = [{ label: 'Postulaciones Cerradas' }, { label: 'Lista de Proyectos' }, { label: 'Detalles', active: true }];
    var code = this.route.snapshot.params.code
    this.getProjectsData().subscribe(data => {
      this.projects = Object.values(data)[0];
      this.project = this.projects.filter(function(data){ return data.code == code })[0];
      this.isLoaded = true;
    });
  }

  getProjectsData() {
    return this.http.get("http://localhost:3000/api/v1.0/projects");
  }

  goToChangeManagment(id): void {
    this.router.navigate(['/change-management/'+this.projects[id-1].code]);
  }

}
