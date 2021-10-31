import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-teacher-list',
  templateUrl: './teacher-list.component.html',
  styleUrls: ['./teacher-list.component.scss']
})
export class TeacherListComponent implements OnInit {
  teachers: any[] = [
    {"name": "Rodrigo Bailon Jairo Selso", "code": "PR282J19", "state":"activo"},
    {"name": "Rodrigo Bailon Jairo Selso", "code": "PR282J19", "state":"activo"},
    {"name": "Rodrigo Bailon Jairo Selso", "code": "PR282J19", "state":"activo"},
    {"name": "Rodrigo Bailon Jairo Selso", "code": "PR282J19", "state":"activo"},
    {"name": "Rodrigo Bailon Jairo Selso", "code": "PR282J19", "state":"activo"},
    {"name": "Rodrigo Bailon Jairo Selso", "code": "PR282J19", "state":"activo"},
    {"name": "Rodrigo Bailon Jairo Selso", "code": "PR282J19", "state":"activo"},
    {"name": "Rodrigo Bailon Jairo Selso", "code": "PR282J19", "state":"activo"},
    {"name": "Rodrigo Bailon Jairo Selso", "code": "PR282J19", "state":"activo"},
    {"name": "Rodrigo Bailon Jairo Selso", "code": "PR282J19", "state":"activo"},
  ];
  constructor() { }

  ngOnInit(): void {
  }

}
