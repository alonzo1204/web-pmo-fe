import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProjectService } from 'src/app/core/services/project.service';

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
  loading: boolean = false;
  breadCrumbItems: Array<{}>;

  constructor(private route: ActivatedRoute, private projectService: ProjectService) { }

  ngOnInit(): void {
    this.breadCrumbItems = [{ label: 'Postulación' }, { label: 'Cartera de Proyectos' }, { label: 'Detalles', active: true }];
    var code = this.route.snapshot.params.code;
    this.titlecode = "Detalles del Proyecto " + code;
    this.loading = true;
    this.projectService.getProjectsData().subscribe({
      error: (err) => this.loading = false, 
      next: (rest) => { 
        this.projects = rest.data;
        this.project = this.projects.filter(function(data){ return data.code == code })[0];
        this.isLoaded = true;
        this.loading = false;
      } 
    });
  }
}
