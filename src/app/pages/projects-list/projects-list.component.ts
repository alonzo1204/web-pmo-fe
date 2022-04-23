import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CareerService } from 'src/app/core/services/career.service';
import { CompanyService } from 'src/app/core/services/company.service';
import { ProjectService } from 'src/app/core/services/project.service';

@Component({
  selector: 'app-projects-list',
  templateUrl: './projects-list.component.html',
  styleUrls: ['./projects-list.component.scss']
})
export class ProjectsListComponent implements OnInit {
  
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
    this.breadCrumbItems = [{ label: 'Asignación de Docentes' }, { label: 'Lista de Proyectos', active: true }]; 
    this.companyService.getCompaniesData().subscribe({ error: (err) => console.log(err), next: (rest) => this.companies = rest.data });
    this.careerService.getCareersData().subscribe({ error: (err) => console.log(err), next: (rest) => this.careers = rest.data });
    this.projectService.getProjectsbyStatusVarius([5, 6]).subscribe({ 
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
      case 1: this.filter = this.projects.filter(function(item){ return item.project_process_state_id == 5; }); break;
      case 2: this.filter = this.projects.filter(function(item){ return item.project_process_state_id == 6; }); break;
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
    this.router.navigate(['/project-details-asignation/'+this.projects[id-1].code]);
  }

}
