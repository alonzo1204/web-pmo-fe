import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProjectService } from 'src/app/core/services/project.service';

@Component({
  selector: 'app-change-request-list',
  templateUrl: './change-request-list.component.html',
  styleUrls: ['./change-request-list.component.scss']
})
export class ChangeRequestListComponent implements OnInit {

  page = 1;
  pageSize = 15;
  number_requests: number;
  keyword: string = "";
  requests: any[] = [];
  filter: any[] = [];
  isLoaded: boolean = false;
  loading: boolean = false;
  breadCrumbItems: Array<{}>;

  constructor(private router: Router, private projectService: ProjectService) { }

  ngOnInit(): void {
    this.breadCrumbItems = [{ label: 'Solicitud de Cambio' }, { label: 'Lista de Solicitudes de Cambio', active: true }];
    //this.loading = true;
    let roles = JSON.parse(localStorage.getItem('currentUser')!).user.roles;
    if (roles[0].id == 1 || roles[0].id == 2 || roles[0].id == 3) { this.getMyEdits() } else this.getAllEdits()
  }

  onStateFilter(id: number) {
    switch (id) {
      case 1: this.filter = this.requests.filter(function (item) { return item.accepted == 0; }); break;
      case 2: this.filter = this.requests.filter(function (item) { return item.accepted == 1; }); break;
      case 3: this.filter = this.requests.filter(function (item) { return item.accepted == 2; }); break;
      default: this.filter = this.requests;
    }
    this.number_requests = this.filter.length;
  }

  onSearchFilter(keyword: string) {
    this.filter = this.requests.filter(function (item) {
      var username = item.user.firstname + " " + item.user.lastname;
      return (username.toLowerCase().includes(keyword.toLowerCase()) ||
        item.project.code.toLowerCase().includes(keyword.toLowerCase()));
    });
    this.number_requests = this.filter.length;
  }

  getMyEdits() {
    this.projectService.getMyRequestsEdits().subscribe({
      error: (err) => this.loading = false, 
      next: (rest) => {        
        this.requests = rest.data;
        this.filter = this.requests;
        this.number_requests = this.requests.length;
        this.isLoaded = true;
        this.loading = false;
      }
    });
  }

  getAllEdits() {
    this.projectService.getAllRequestsEdits().subscribe({
      error: (err) => this.loading = false, 
      next: (rest) => {        
        this.requests = rest.data;
        this.filter = this.requests;
        this.number_requests = this.requests.length;
        this.isLoaded = true;
        this.loading = false;
      }
    });
  }

  gotodetails(code: string) {
    this.router.navigate(['/change-request/' + code]);
  }

}
