import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit {
  page = 1;
  number_projects: number = 50;
  pageSize = 15;
  keyword: string = "";
  users: any[] = [];
  filter: any[] = [];
  isLoaded: boolean = false;
  title: string = "Todos";

  constructor(private router: Router, private http: HttpClient) { }

  ngOnInit(): void {
    this.getUsersData().subscribe(data => {
      this.users = Object.values(data)[0];
      this.number_projects = this.users.length;
      this.filter = this.users;
      this.isLoaded = true;
    });
  }

  getUsersData() {
    return this.http.get("http://localhost:3000/api/v1.0/users/");
  }

  FiltrarTodos(): void {
    this.filter = this.users;
  }

  FiltrarAlumnos(): void {
    this.filter = this.users.filter(function(item){return (item.role.name == "tdp" || item.role.name == "tp1" || item.role.name == "tp2");});
  }

  FiltrarDocentes(): void {
    this.filter = this.users.filter(function(item){return item.role.name == "docente";});
  }

  FiltrarComites(): void {
    this.filter = this.users.filter(function(item){return item.role.name == "comite";});
  }

  FiltrarInactivos(): void {
    this.filter = this.users.filter(function(item){return item.active == 0;});
  }

  onSearchFilter(keyword: string) {
    this.filter = this.users.filter(function(item){
      var username = item.firstname + " " + item.lastname;
      return (username.toLowerCase().includes(keyword.toLowerCase()) || 
      item.code.toLowerCase().includes(keyword.toLowerCase()) || 
      item.role.name.toLowerCase().includes(keyword.toLowerCase()));
    });
  }

  gotodetails(id) {
    this.router.navigate(['/user-details/'+this.users[id-1].code]);
  }

}
