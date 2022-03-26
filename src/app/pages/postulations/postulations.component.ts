import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-postulations',
  templateUrl: './postulations.component.html',
  styleUrls: ['./postulations.component.scss']
})
export class PostulationsComponent implements OnInit {
  page = 1;
  number_projects: number = 50;
  pageSize = 10;
  keyword: string = "";
  postulations: any[] = [];
  filter: any[] = [];
  breadCrumbItems: Array<{}>;

  constructor(private router: Router, private http: HttpClient) { }

  gotodetails(id) {
    this.router.navigate(['/project-details/'+this.postulations[id].code]);
  }

  getProjectsData() {
    return this.http.get("http://localhost:30/api/v1.0/projects");
  }

  ngOnInit(): void {
    this.breadCrumbItems = [{ label: 'Postulaciones Cerradas' }, { label: 'Proyectos Cerrados', active: true }];
    this.getProjectsData().subscribe(data => {
      this.postulations = Object.values(data)[0];
      this.number_projects = this.postulations.length;
      this.filter = this.postulations;
    });
  }

  FiltrarTodos(): void {
    this.filter = this.postulations;
  }

  FiltrarCC(): void {
    this.filter = this.postulations.filter(function(item){return item.career.name == "Ciencias de la Computación";});
  }

  FiltrarSW(): void {
    this.filter = this.postulations.filter(function(item){return item.career.name == "Ingeniería de Software";});
  }

  FiltrarIS(): void {
    this.filter = this.postulations.filter(function(item){return item.career.name == "Ingeniería de Sistemas";});
  }

  onSearchFilter(keyword: string) {
    this.filter = this.postulations.filter(function(item){
      return (item.code.toLowerCase().includes(keyword.toLowerCase()) || 
      item.name.toLowerCase().includes(keyword.toLowerCase()) || 
      item.company.name.toLowerCase().includes(keyword.toLowerCase()) || 
      item.career.name.toLowerCase().includes(keyword.toLowerCase()));
    });
  }

}
