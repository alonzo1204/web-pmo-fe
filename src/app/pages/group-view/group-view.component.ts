import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-group-view',
  templateUrl: './group-view.component.html',
  styleUrls: ['./group-view.component.scss']
})
export class GroupViewComponent implements OnInit {

  project: any;
  assigned: boolean = true;
  isLoaded: boolean = true;
  breadCrumbItems: Array<{}>;

  constructor(private router: Router, private http: HttpClient) { }

  ngOnInit(): void {
    this.breadCrumbItems = [{ label: 'Grupos' }, { label: 'Visualizar Mi Grupo', active: true }];
    this.getProjectsData().subscribe(data => {
      var projects = Object.values(data)[0];
      this.project = projects[0];
    });
  }

  getProjectsData() {
    return this.http.get("http://localhost:30/api/v1.0/projects");
  }

  groupregister() {
    this.router.navigate(['/group-register']);
  }

  gotodetails(code) {
    this.router.navigate(['/project-details-portfolio/'+code]);
  }

}
