import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CareerService } from 'src/app/core/services/career.service';
import { CompanyService } from 'src/app/core/services/company.service';
import { ProjectService } from 'src/app/core/services/project.service';

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.scss']
})
export class ProjectDetailsComponent implements OnInit {
  
  newcode: any;
  project: any;
  projects: any[] = [];
  isLoaded: Boolean = false;
  loading: boolean = false;
  breadCrumbItems: Array<{}>;

  constructor(private route: ActivatedRoute, private router: Router, private projectService: ProjectService) { }

  ngOnInit(): void {
    this.breadCrumbItems = [{ label: 'Postulaciones Cerradas' }, { label: 'Lista de Proyectos' }, { label: 'Detalles', active: true }];
    let code = this.route.snapshot.params.code;
    this.newcode = code;
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

  goToHistory(): void {
    this.router.navigate(['/project-history/' + this.newcode]);
  }

  goToChangeManagment(id): void {
    this.router.navigate(['/change-management/'+this.projects[id-1].code]);
  }

}
