import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProjectService } from 'src/app/core/services/project.service';

@Component({
  selector: 'app-postulations',
  templateUrl: './postulations.component.html',
  styleUrls: ['./postulations.component.scss']
})
export class PostulationsComponent implements OnInit {
  page = 1;
  pageSize = 10;
  number_projects: number;
  keyword: string = "";
  postulations: any[] = [];
  filter: any[] = [];
  breadCrumbItems: Array<{}>;

  loading: boolean = false;
  
  constructor(private router: Router, private projectService: ProjectService) { }

  ngOnInit(): void {
    this.breadCrumbItems = [{ label: 'Postulaciones Cerradas' }, { label: 'Proyectos Cerrados', active: true }];
    this.loading = true;
    this.projectService.getProjectsData().subscribe({
      error: (err) => this.loading = false, 
      next: (rest) => { 
        this.postulations = rest.data;
        this.filter = this.postulations;
        this.number_projects = this.postulations.length;
        this.loading = false;
      }
    });
  }

  onCareerFilter(id: number) {
    switch(id) {
      case 1: this.filter = this.postulations.filter(function(item){ return item.career.name == "Ingeniería de Sistemas"; }); break;
      case 2: this.filter = this.postulations.filter(function(item){ return item.career.name == "Ingeniería de Software"; }); break;
      case 3: this.filter = this.postulations.filter(function(item){ return item.career.name == "Ciencias de la Computación"; }); break;
      default: this.filter = this.postulations;
    }
    this.number_projects = this.filter.length;
  }

  onSearchFilter(keyword: string) {
    this.filter = this.postulations.filter(function(item){
      return (item.code.toLowerCase().includes(keyword.toLowerCase()) || 
      item.name.toLowerCase().includes(keyword.toLowerCase()) || 
      item.company.name.toLowerCase().includes(keyword.toLowerCase()));
    });
    this.number_projects = this.filter.length;
  }

  gotodetails(id: number) {
    this.router.navigate(['/project-details/'+this.postulations[id].code]);
  }

}
