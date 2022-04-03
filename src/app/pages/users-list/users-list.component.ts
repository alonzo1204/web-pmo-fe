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
  breadCrumbItems: Array<{}>;

  level: number;

  constructor(private router: Router, private http: HttpClient) { }

  ngOnInit(): void {
    this.breadCrumbItems = [{ label: 'Usuarios' }, { label: 'Lista de Usuarios', active: true }];
    this.getUsersData().subscribe(data => {
      this.users = Object.values(data)[0];
      this.number_projects = this.users.length;
      this.filter = this.users;
      this.isLoaded = true;
    });
  }

  getUsersData() {
    return this.http.get("http://localhost:30/api/v1.0/users/");
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

  averageStudent(min, max): string {
    var average = Math.floor(Math.random() * (max - min + 1) + min);
    return average.toFixed(2);
  }

  englishLevel(min, max): number {
    this.level = Math.floor(Math.random() * (max - min + 1) + min);
    return this.level;
  }

  englishLabel(level): string {
    if (level == 5) return level + ' - apto'
    else return level + ' - no apto'
  }

}
