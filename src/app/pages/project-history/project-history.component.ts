import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CareerService } from 'src/app/core/services/career.service';
import { CompanyService } from 'src/app/core/services/company.service';
import { ProjectService } from 'src/app/core/services/project.service';

@Component({
  selector: 'app-project-history',
  templateUrl: './project-history.component.html',
  styleUrls: ['./project-history.component.scss']
})
export class ProjectHistoryComponent implements OnInit {

  project: any;
  records: any[] = [];
  projects: any[] = [];
  companies: any[] = [];
  careers: any[] = [];
  isLoaded: Boolean = false;
  loading: boolean = false;
  breadCrumbItems: Array<{}>;

  constructor(private route: ActivatedRoute, private router: Router, private projectService: 
    ProjectService, private companyService: CompanyService, private careerService: CareerService) { }

  ngOnInit(): void {
    this.breadCrumbItems = [{ label: 'Lista de Proyectos' }, { label: 'Historial', active: true }];
    var code = this.route.snapshot.params.code;
    this.companyService.getCompaniesData().subscribe({ next: (rest) => this.companies = rest.data });
    this.careerService.getCareersData().subscribe({ next: (rest) => this.careers = rest.data });
    this.loading = true;
    this.projectService.getProjectsData().subscribe({
      error: (err) => this.loading = false, 
      next: (rest) => {
        this.projects = rest.data;
        this.project = this.projects.filter(function(data){ return data.code == code })[0];
        this.historyProjects(this.project.id);
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

  goToChangeManagment(id): void {
    this.router.navigate(['/change-management/'+this.projects[id-1].code]);
  }

}
