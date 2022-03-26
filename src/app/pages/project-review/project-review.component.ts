import { Component, OnInit, Input} from '@angular/core';
import {Router} from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-project-review',
  templateUrl: './project-review.component.html',
  styleUrls: ['./project-review.component.scss']
})
export class ProjectReviewComponent implements OnInit {
  page = 1;
  number_projects: number = 50;
  pageSize = 10;
  keyword: string = "";
  projects: any[] = [];
  filter: any[] = [];
  isLoaded: boolean = false;
  breadCrumbItems: Array<{}>;

  constructor(private router: Router, private http: HttpClient) { }

  ngOnInit(): void {
    this.filter = this.projects;
    this.getProjectsData().subscribe(data => {
      this.projects = Object.values(data)[0];
      this.number_projects = this.projects.length;
      this.filter = this.projects;
      this.isLoaded = true;
    });
    this.breadCrumbItems = [{ label: 'Proyectos' }, { label: 'Revisión de Proyectos', active: true }];
  }

  getProjectsData() {
    return this.http.get("http://localhost:30/api/v1.0/projects");
  }

  FiltrarTodos(): void {
    this.filter = this.projects;
  }

  FiltrarAprobados(): void {
    this.filter = this.projects.filter(function(item){return item.project_process_state.id == 2;});
  }

  FiltrarPendientes(): void {
    this.filter = this.projects.filter(function(item){return item.project_process_state.id == 1;});
  }

  FiltrarRechazados(): void {
    this.filter = this.projects.filter(function(item){return item.project_process_state.id == 3;});
  }

  onSearchFilter(keyword: string) {
    this.filter = this.projects.filter(function(item){
      return (item.code.toLowerCase().includes(keyword.toLowerCase()) || 
      item.name.toLowerCase().includes(keyword.toLowerCase()) || 
      item.company.name.toLowerCase().includes(keyword.toLowerCase()) || 
      item.career.name.toLowerCase().includes(keyword.toLowerCase()));
    });
  }

  gotodetails(id) {
    this.router.navigate(['/project-details-review/'+this.projects[id-1].code]);
  }

}
