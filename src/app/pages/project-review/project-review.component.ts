import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CareerService } from 'src/app/core/services/career.service';
import { CompanyService } from 'src/app/core/services/company.service';
import { ProjectService } from 'src/app/core/services/project.service';

@Component({
  selector: 'app-project-review',
  templateUrl: './project-review.component.html',
  styleUrls: ['./project-review.component.scss']
})
export class ProjectReviewComponent implements OnInit {

  page = 1;
  pageSize = 10;
  projects: any[] = [];
  filter: any[] = [];
  keyword: string = '';
  number_projects!: number;
  isLoaded: boolean = false;
  breadCrumbItems: Array<{}>;

  careers: any[] = [];
  companies: any[] = [];

  constructor(private router: Router, private projectService: ProjectService, 
              private companyService: CompanyService, private careerService: CareerService) { }

  ngOnInit(): void {
    this.breadCrumbItems = [{ label: 'Revisión de Proyectos' }, { label: 'Lista de Proyectos', active: true }];
    this.companyService.getCompaniesData().subscribe({ error: (err) => console.log(err), next: (rest) => this.companies = rest.data });
    this.careerService.getCareersData().subscribe({ error: (err) => console.log(err), next: (rest) => this.careers = rest.data });
    this.projectService.getProjectsbyStatusVarius([1, 2, 3, 4]).subscribe({ 
      error: (err) => console.log(err), 
      next: (rest) => {
        this.projects = rest.data;
        this.number_projects = this.projects.length;
        this.filter = this.projects;
        this.isLoaded = true;
      } 
    });
  }

  onStatusFilter(id: number) {
    switch(id) {
      case 1: this.filter = this.projects.filter(function(item){ return item.project_process_state_id == 1; }); break;
      case 2: this.filter = this.projects.filter(function(item){ return item.project_process_state_id == 2; }); break;
      case 3: this.filter = this.projects.filter(function(item){ return item.project_process_state_id == 3; }); break;
      case 4: this.filter = this.projects.filter(function(item){ return item.project_process_state_id == 4; }); break;
      default: this.filter = this.projects;
    }
    this.number_projects = this.filter.length;
  }

  nameStatus(id: number): string {
    switch(id) {
      case 1: return 'Pendiente de aprobación'; break;
      case 2: return 'Aprobado'; break;
      case 3: return 'Denegado'; break;
      case 4: return 'Aceptado con comentarios'; break;
      case 5: return 'Asignado'; break;
      default: return 'Pendiente de asignación de docentes';
    }
  }

  nameCareer(id: number): string {
    var career = this.careers.filter(function(item){ return item.id = id })[0];
    return career.name;
  }

  imageCompany(id: number): string {
    var company = this.companies.filter(function(item){ return item.id = id })[0];
    return company.image;
  }

  onSearchFilter(keyword: string) {
    this.filter = this.projects.filter(function(item){
      return (item.code.toLowerCase().includes(keyword.toLowerCase()) || 
      item.name.toLowerCase().includes(keyword.toLowerCase()) || 
      item.company.name.toLowerCase().includes(keyword.toLowerCase()) || 
      item.career.name.toLowerCase().includes(keyword.toLowerCase()));
    });
    this.number_projects = this.filter.length;
  }

  gotodetails(id: number) {
    this.router.navigate(['/project-details-review/'+this.projects[id-1].code]);
  }

}
