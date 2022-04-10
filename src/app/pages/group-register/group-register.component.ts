import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-group-register',
  templateUrl: './group-register.component.html',
  styleUrls: ['./group-register.component.scss']
})
export class GroupRegisterComponent implements OnInit {

  userprofile: any = { name: 'Juan Diego', lastname: 'Peña Chafalote', code: 'u201213280', sede: 'M', career: 1 };
  username: string = this.userprofile.name + " " + this.userprofile.lastname;

  activepartner: boolean = true;

  careers: any[] = [];
  companies: any[] = [];
  studies: number = 3;
  breadCrumbItems: Array<{}>;

  constructor(private router: Router, private http: HttpClient) { }

  ngOnInit(): void {
    this.breadCrumbItems = [{ label: 'Grupos' }, { label: 'Añadir Grupo', active: true }];
    this.getCompaniesData().subscribe(data => { this.companies = Object.values(data)[0]; });
    this.getCareersData().subscribe(data => { this.careers = Object.values(data)[0]; });
  }

  getCompaniesData() {
    return this.http.get("http://localhost:30/api/v1.0/companies");
  }

  getCareersData() {
    return this.http.get("http://localhost:30/api/v1.0/careers");
  }

}
