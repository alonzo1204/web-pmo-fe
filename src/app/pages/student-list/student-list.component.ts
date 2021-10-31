import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.scss']
})
export class StudentListComponent implements OnInit {
  students: any[] = [
    {"name": "Geral Esteen Castillo Arredondo", "code": "U202116913", "state":"activo"},
    {"name": "Geral Esteen Castillo Arredondo", "code": "U202116913", "state":"activo"},
    {"name": "Geral Esteen Castillo Arredondo", "code": "U202116913", "state":"activo"},
    {"name": "Geral Esteen Castillo Arredondo", "code": "U202116913", "state":"activo"},
    {"name": "Geral Esteen Castillo Arredondo", "code": "U202116913", "state":"activo"},
    {"name": "Geral Esteen Castillo Arredondo", "code": "U202116913", "state":"activo"},
    {"name": "Geral Esteen Castillo Arredondo", "code": "U202116913", "state":"activo"},
    {"name": "Geral Esteen Castillo Arredondo", "code": "U202116913", "state":"activo"},
    {"name": "Geral Esteen Castillo Arredondo", "code": "U202116913", "state":"activo"},
    {"name": "Geral Esteen Castillo Arredondo", "code": "U202116913", "state":"activo"}
  ];
  constructor() { }

  ngOnInit(): void {
  }

}
