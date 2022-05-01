import { Component, OnInit } from '@angular/core';
import { PortfolioService } from 'src/app/core/services/portfolio.service';

@Component({
  selector: 'app-portfolios-list',
  templateUrl: './portfolios-list.component.html',
  styleUrls: ['./portfolios-list.component.scss']
})
export class PortfoliosListComponent implements OnInit {

  page = 1;
  pageSize = 15;
  number_portfolios: number;
  keyword: string = "";
  portfolios: any[] = [];
  filter: any[] = [];
  isLoaded: boolean = false;
  breadCrumbItems: Array<{}>;

  loading: boolean = false;

  constructor(private portfolioService: PortfolioService) { }

  ngOnInit(): void {
    this.breadCrumbItems = [{ label: 'Portafolios' }, { label: 'Lista de Portafolios', active: true }];
    this.loading = true;
    this.portfolioService.getPortfoliosData().subscribe({
      error: (err) => this.loading = false, 
      next: (rest) => {
        this.portfolios = rest.data;
        this.filter = this.portfolios;
        this.number_portfolios = this.portfolios.length;
        this.isLoaded = true;
        this.loading = false;
      }
    });
  }

  onStatusFilter(id: number) {
    switch(id) {
      case 1: this.filter = this.portfolios.filter(function(item){ return item.Portfolio_state.state == "Abierta"; }); break;
      case 2: this.filter = this.portfolios.filter(function(item){ return item.Portfolio_state.state == "Sin Asignaciones"; }); break;
      case 3: this.filter = this.portfolios.filter(function(item){ return item.Portfolio_state.state == "Asignada"; }); break;
      case 4: this.filter = this.portfolios.filter(function(item){ return item.Portfolio_state.state == "Cerrada"; }); break;
      default: this.filter = this.portfolios;
    }
    this.number_portfolios = this.filter.length;
  }

  onSearchFilter(keyword: string) {
    this.filter = this.portfolios.filter(function(item){
      return (item.Portfolio.name.toLowerCase().includes(keyword.toLowerCase()) || 
      item.Semester.name.includes(keyword.toLowerCase()));
    });
    this.number_portfolios = this.filter.length; 
  }

}
