import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit {
  users: any[] = [
    {"name": "Rodrigo Bailon Jairo Selso", "code": "PR282J19", "state":"activo", "type":"docente"},
    {"name": "Rodrigo Bailon Jairo Selso", "code": "PR282J19", "state":"activo", "type":"docente"},
    {"name": "Rodrigo Bailon Jairo Selso", "code": "PR282J19", "state":"activo", "type":"docente"},
    {"name": "Cesar Ruso Luciando Jora", "code": "U20196789", "state":"inactivo", "type":"alumno"},
    {"name": "Cesar Ruso Luciando Jora", "code": "U20196789", "state":"inactivo", "type":"alumno"},
    {"name": "Cesar Ruso Luciando Jora", "code": "U20196789", "state":"inactivo", "type":"alumno"},
    {"name": "Geral Esteen Castillo Arredondo", "code": "U202116913", "state":"activo", "type":"alumno"},
    {"name": "Geral Esteen Castillo Arredondo", "code": "U202116913", "state":"activo", "type":"alumno"},
    {"name": "Geral Esteen Castillo Arredondo", "code": "U202116913", "state":"activo", "type":"alumno"},
    {"name": "Geral Esteen Castillo Arredondo", "code": "U202116913", "state":"activo", "type":"alumno"},
    {"name": "Geral Esteen Castillo Arredondo", "code": "U202116913", "state":"activo", "type":"alumno"},
    {"name": "Rodrigo Bailon Jairo Selso", "code": "PR282J19", "state":"activo", "type":"docente"},
    {"name": "Rodrigo Bailon Jairo Selso", "code": "PR282J19", "state":"activo", "type":"docente"},
    {"name": "Rodrigo Bailon Jairo Selso", "code": "PR282J19", "state":"activo", "type":"docente"},
    {"name": "Rodrigo Bailon Jairo Selso", "code": "PR282J19", "state":"activo", "type":"docente"},
    {"name": "Rodrigo Bailon Jairo Selso", "code": "PR282J19", "state":"activo", "type":"docente"},
    {"name": "Rodrigo Bailon Jairo Selso", "code": "PR282J19", "state":"activo", "type":"docente"},
    {"name": "Rodrigo Bailon Jairo Selso", "code": "PR282J19", "state":"activo", "type":"docente"},
    {"name": "Geral Esteen Castillo Arredondo", "code": "U202116913", "state":"activo", "type":"alumno"},
    {"name": "Geral Esteen Castillo Arredondo", "code": "U202116913", "state":"activo", "type":"alumno"},
    {"name": "Geral Esteen Castillo Arredondo", "code": "U202116913", "state":"activo", "type":"alumno"},
    {"name": "Geral Esteen Castillo Arredondo", "code": "U202116913", "state":"activo", "type":"alumno"},
    {"name": "Geral Esteen Castillo Arredondo", "code": "U202116913", "state":"activo", "type":"alumno"},
    {"name": "Cesar Ruso Luciando Jora", "code": "U20196789", "state":"inactivo", "type":"alumno"},
    {"name": "Cesar Ruso Luciando Jora", "code": "U20196789", "state":"inactivo", "type":"alumno"},
    {"name": "Cesar Ruso Luciando Jora", "code": "U20196789", "state":"inactivo", "type":"alumno"},
    {"name": "Cesar Ruso Luciando Jora", "code": "U20196789", "state":"inactivo", "type":"alumno"},
    {"name": "Cesar Ruso Luciando Jora", "code": "U20196789", "state":"inactivo", "type":"alumno"},
    {"name": "Cesar Ruso Luciando Jora", "code": "U20196789", "state":"inactivo", "type":"alumno"},
    {"name": "Cesar Ruso Luciando Jora", "code": "U20196789", "state":"inactivo", "type":"alumno"},
  ];
  filter: any[] = [];
  isLoaded: boolean = false;
  title: string = "Todos";

  constructor() { }

  ngOnInit(): void {
    this.filter = this.users;
    this.isLoaded = true;
  }

  FiltrarTodos(): void {
    this.filter = this.users;
    this.title = "Todos";
  }

  FiltrarAlumnos(): void {
    this.filter = this.users.filter(function(item){return item.type == "alumno";});
    this.title = "Alumnos";
  }

  FiltrarDocentes(): void {
    this.filter = this.users.filter(function(item){return item.type == "docente";});
    this.title = "Docentes";
  }

  FiltrarInactivos(): void {
    this.filter = this.users.filter(function(item){return item.state == "inactivo";});
    this.title = "Usuarios inactivos";
  }

}
