import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit {
  users: any[] = [];
  filter: any[] = [];
  isLoaded: boolean = false;
  title: string = "Todos";

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.getUsersData().subscribe(data => {
      this.users = Object.values(data)[0];
      console.log(this.users[0]);
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

}
