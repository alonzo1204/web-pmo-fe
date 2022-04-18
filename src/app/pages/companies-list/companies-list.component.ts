import { Component, OnInit } from '@angular/core';
import { CompanyService } from 'src/app/core/services/company.service';

@Component({
  selector: 'app-companies-list',
  templateUrl: './companies-list.component.html',
  styleUrls: ['./companies-list.component.scss']
})
export class CompaniesListComponent implements OnInit {

  page = 1;
  pageSize = 15;
  number_companies: number;
  keyword: string = "";
  companies: any[] = [];
  filter: any[] = [];
  level: number;
  isLoaded: boolean = false;
  breadCrumbItems: Array<{}>;

  constructor(private companyService: CompanyService) { }

  ngOnInit(): void {
    this.breadCrumbItems = [{ label: 'Empresas Virtuales' }, { label: 'Lista de Empresas', active: true }];
    this.companyService.getCompaniesData().subscribe({
      error: (err) => console.log(err), 
      next: (rest) => { 
        this.companies = rest.data;
        this.filter = this.companies;
        this.number_companies = this.companies.length;
        this.isLoaded = true;
      }
    });
  }

}
