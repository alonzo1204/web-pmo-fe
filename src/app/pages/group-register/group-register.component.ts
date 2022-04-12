import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';

@Component({
  selector: 'app-group-register',
  templateUrl: './group-register.component.html',
  styleUrls: ['./group-register.component.scss']
})
export class GroupRegisterComponent implements OnInit {

  user: any;
  username: string;
  users_code: any = [];
  
  partner: any;
  datapartner: any;
  partnername: string;
  activepartner: boolean = false;

  users: any[] = [];
  careers: any[] = [];
  companies: any[] = [];
  studies: number = 3;
  breadCrumbItems: Array<{}>;

  constructor(private router: Router, private http: HttpClient) { }

  ngOnInit(): void {
    this.breadCrumbItems = [{ label: 'Grupos' }, { label: 'Añadir Grupo', active: true }];
    var currentUser = JSON.parse(localStorage.getItem("currentUser")!);
    var viewUser = currentUser.data;
    this.user = { code: viewUser.code, firstname: viewUser.firstname, lastname: viewUser.lastname, sede: 'M', career: 1 };
    this.username = this.user.firstname+" "+this.user.lastname;

    this.getUsersData().subscribe(data => { 
      var count = 0;
      this.users = Object.values(data)[0]; 
      while (count < this.users.length) { this.users[count].code != 'u201213280' ? this.users_code.push(this.users[count].code) : ''; count++ }
    });
    this.getCompaniesData().subscribe(data => { this.companies = Object.values(data)[0]; });
    this.getCareersData().subscribe(data => { this.careers = Object.values(data)[0]; });
  }

  getUsersData() {
    return this.http.get("http://localhost:30/api/v1.0/users/");
  }

  getCompaniesData() {
    return this.http.get("http://localhost:30/api/v1.0/companies");
  }

  getCareersData() {
    return this.http.get("http://localhost:30/api/v1.0/careers");
  }

  getPartnerData(code) {
    if (code != undefined) {
      this.datapartner = this.users.filter(function(data){ return data.code == code })[0];
      this.datapartner != undefined ? this.activepartner = true : this.activepartner = false;
      this.datapartner != undefined ? this.partnername = this.datapartner.firstname+" "+this.datapartner.lastname : this.partnername = '';
    }
  }

  search = (text$: Observable<string>) =>
    text$
      .debounceTime(200)
      .distinctUntilChanged()
      .map(term => term.length < 3 ? [] : this.users_code.filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10));

}
