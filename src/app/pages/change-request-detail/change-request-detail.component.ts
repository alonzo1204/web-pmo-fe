import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectService } from 'src/app/core/services/project.service';

@Component({
  selector: 'app-change-request-detail',
  templateUrl: './change-request-detail.component.html',
  styleUrls: ['./change-request-detail.component.scss']
})
export class ChangeRequestDetailComponent implements OnInit {

  roles: any;
  request: any;
  project: any;
  value: string = '';
  requests: any[] = [];
  loading: boolean = false;
  isLoaded: boolean = false;
  breadCrumbItems: Array<{}>;

  constructor(private route: ActivatedRoute, private router: Router, private projectService: ProjectService) { }

  ngOnInit(): void {
    this.breadCrumbItems = [{ label: 'Solicitud de Cambio' }, { label: 'Lista de Solicitudes de Cambio' }, { label: 'Detalle', active: true }];
    var code = this.route.snapshot.params.code;
    this.roles = JSON.parse(localStorage.getItem('currentUser')!).user.roles;
    this.loading = true;
    if (this.roles[0].id == 1 || this.roles[0].id == 2 || this.roles[0].id == 3) { this.getMyEdits(code) } else this.getAllEdits(code)
  }

  searchProjectData(project: any) {
    //var project_id = group.project_assigned;
    this.projectService.getProjectsData().subscribe({
      next: (rest) => { 
        let projects = rest.data;
        this.project = projects.filter(function(data){ return data.code == project })[0];
        //console.log(this.project);
      }
    });
  }

  getMyEdits(code) {
    this.projectService.getMyRequestsEdits().subscribe({
      error: (err) => this.loading = false, 
      next: (rest) => {        
        this.requests = rest.data;
        this.request = this.requests.filter(function (data) { return data.id == code })[0];
        this.searchProjectData(this.request.project.code);
        this.value = this.request.value;
        this.isLoaded = true;
        this.loading = false;
      }
    });
  }

  getAllEdits(code) {
    this.projectService.getAllRequestsEdits().subscribe({
      error: (err) => this.loading = false, 
      next: (rest) => {        
        this.requests = rest.data;
        this.request = this.requests.filter(function (data) { return data.id == code })[0];
        this.searchProjectData(this.request.project.code);
        this.value = this.request.value;
        this.isLoaded = true;
        this.loading = false;
      }
    });
  }

  gotodetails(code: string) {
    this.router.navigate(['/project-details-portfolio/' + code]);
  }

}
