import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-postulations',
  templateUrl: './postulations.component.html',
  styleUrls: ['./postulations.component.scss']
})
export class PostulationsComponent implements OnInit {
  postulations: any[] = [
    { "name": "Proyecto Nro 1", "definition": "Definición del Proyecto", "estado": "activo" },
    { "name": "Proyecto Nro 2", "definition": "Definición del Proyecto", "estado": "activo" },
    { "name": "Proyecto Nro 3", "definition": "Definición del Proyecto", "estado": "activo" },
    { "name": "Proyecto Nro 4", "definition": "Definición del Proyecto", "estado": "inactivo" }
  ];

  constructor(private router: Router) { }

  gotodetails() {
    this.router.navigate(['/project-details']);
  }

  ngOnInit(): void {
  }

}
