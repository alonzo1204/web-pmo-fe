import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { HttpClient } from '@angular/common/http';
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

  constructor(private router: Router, private projectService: ProjectService) { }

  ngOnInit(): void {
    this.breadCrumbItems = [{ label: 'Asignación de Docentes' }, { label: 'Lista de Proyectos', active: true }]; 
    this.projectService.getProjectsData().subscribe({ 
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
      case 1: this.filter = this.projects.filter(function(item){ return item.project_process_state.id == 1; }); break;
      case 2: this.filter = this.projects.filter(function(item){ return item.project_process_state.id == 2; }); break;
      default: this.filter = this.projects;
    }
    this.number_projects = this.filter.length;
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
