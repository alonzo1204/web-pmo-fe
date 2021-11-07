import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-change-management',
  templateUrl: './change-management.component.html',
  styleUrls: ['./change-management.component.scss']
})
export class ChangeManagementComponent implements OnInit {
  project: any;
  projects: any[] = [
    { "id": 0, "code": "PRY2021201", "definition": "CoVMASPeru: Modelos multi agente para predecir la evolución de la pandemia en Perú Research & Games", "image": "assets/images/logos/Data-Center.png"},
    { "id": 1, "code": "PRY2021202", "definition": "Imagination: Generación de imágenes a partir de un texto Research & Games", "image": "assets/images/logos/Innova-TI.png"},
    { "id": 2, "code": "PRY2021203", "definition": "NAOEmotion: Generación de texto a partir de un sentimiento utilizando el robot NAO", "image": "assets/images/logos/IT-Consulting.png"},
    { "id": 3, "code": "PRY2021204", "definition": "SmartAgro: pattern mining con computación evolutiva para extracción de patrones en agricultura", "image": "assets/images/logos/IT-Research.png"}
  ];
  isLoaded: Boolean = false;
  detalles: string = "";
  cambio: string = "CNP";

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    var code = this.route.snapshot.params.code
    this.project = this.projects.filter(function(data){ return data.code == code })[0];
    this.isLoaded = true;
  }

  successmsg() {
    console.log(this.detalles);
    console.log(this.cambio);
    Swal.fire({
      title: 'Gestión de cambio enviada',
      text: 'Tu gestión sera evaluada en  el transcurso de los dias',
      icon: 'success',
      confirmButtonColor: '#EF360E',
    });
  }
}
