import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProjectService } from 'src/app/core/services/project.service';
import { CompanyService } from 'src/app/core/services/company.service';
import { CareerService } from 'src/app/core/services/career.service';

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

  records: any[] = [];
  companies: any[] = [];
  careers: any[] = [];

  constructor(private route: ActivatedRoute, private projectService: ProjectService, private companyService: CompanyService, 
    private careerService: CareerService) { }

  ngOnInit(): void {
    this.breadCrumbItems = [{ label: 'Postulación' }, { label: 'Cartera de Proyectos' }, { label: 'Detalles', active: true }];
    var code = this.route.snapshot.params.code;
    this.companyService.getCompaniesData().subscribe({ next: (rest) => this.companies = rest.data });
    this.careerService.getCareersData().subscribe({ next: (rest) => this.careers = rest.data });
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

  historyProjects(id) {
    let params = { id_postulation_row: id }
    this.projectService.getHistoryProjects(params).subscribe({
      error: (err) => {
        this.loading = false;
        console.log(err);
      },
      next: (rest) => {
        this.records = rest.data;
        this.isLoaded = true;
        this.loading = false;
        console.log(rest)
      }
    });
  }

  searchCareerData(id): string {
    let career = this.careers.filter((item) => { return item.id == id })[0];
    return career.name;
  }

  searchCompanyData(id): string {
    let company = this.companies.filter((item) => { return item.id == id })[0];
    return company.image
  }
}
