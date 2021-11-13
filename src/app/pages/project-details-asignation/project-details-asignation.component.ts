import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-project-details-asignation',
  templateUrl: './project-details-asignation.component.html',
  styleUrls: ['./project-details-asignation.component.scss']
})
export class ProjectDetailsAsignationComponent implements OnInit {
  projects: any[] = [
    { "id": 0, "code": "PRY2021201", "definition": "CoVMASPeru: Modelos multi agente para predecir la evolución de la pandemia en Perú Research & Games", "image": "assets/images/logos/Data-Center.png",
      "studies": "Ciencias de la Computación", "state": "Aprobado"},
    { "id": 1, "code": "PRY2021202", "definition": "Imagination: Generación de imágenes a partir de un texto Research & Games", "image": "assets/images/logos/Innova-TI.png",
      "studies": "Ingeniería de Sistemas", "state": "Rechazado"},
    { "id": 2, "code": "PRY2021203", "definition": "NAOEmotion: Generación de texto a partir de un sentimiento utilizando el robot NAO", "image": "assets/images/logos/IT-Consulting.png",
      "studies": "Ingeniería de Software", "state": "Pendiente"},
    { "id": 3, "code": "PRY2021204", "definition": "SmartAgro: pattern mining con computación evolutiva para extracción de patrones en agricultura", "image": "assets/images/logos/IT-Research.png",
      "studies": "Ingeniería de Sistemas", "state": "Pendiente"},
    { "id": 4, "code": "PRY2021205", "definition": "CoVMASPeru: Modelos multi agente para predecir la evolución de la pandemia en Perú Research & Games", "image": "assets/images/logos/Data-Center.png",
      "studies": "Ciencias de la Computación", "state": "Aprobado"},
    { "id": 5, "code": "PRY2021206", "definition": "Imagination: Generación de imágenes a partir de un texto Research & Games", "image": "assets/images/logos/Innova-TI.png",
      "studies": "Ingeniería de Sistemas", "state": "Rechazado"},
    { "id": 6, "code": "PRY2021207", "definition": "NAOEmotion: Generación de texto a partir de un sentimiento utilizando el robot NAO", "image": "assets/images/logos/IT-Consulting.png",
      "studies": "Ingeniería de Software", "state": "Pendiente"},
    { "id": 7, "code": "PRY2021208", "definition": "SmartAgro: pattern mining con computación evolutiva para extracción de patrones en agricultura", "image": "assets/images/logos/IT-Research.png",
      "studies": "Ingeniería de Sistemas", "state": "Pendiente"},
    { "id": 8, "code": "PRY2021209", "definition": "CoVMASPeru: Modelos multi agente para predecir la evolución de la pandemia en Perú Research & Games", "image": "assets/images/logos/Data-Center.png",
      "studies": "Ciencias de la Computación", "state": "Aprobado"},
    { "id": 9, "code": "PRY2021210", "definition": "Imagination: Generación de imágenes a partir de un texto Research & Games", "image": "assets/images/logos/Innova-TI.png",
      "studies": "Ingeniería de Sistemas", "state": "Rechazado"},
    { "id": 10, "code": "PRY2021211", "definition": "NAOEmotion: Generación de texto a partir de un sentimiento utilizando el robot NAO", "image": "assets/images/logos/IT-Consulting.png",
      "studies": "Ingeniería de Software", "state": "Pendiente"},
    { "id": 11, "code": "PRY2021212", "definition": "SmartAgro: pattern mining con computación evolutiva para extracción de patrones en agricultura", "image": "assets/images/logos/IT-Research.png",
      "studies": "Ingeniería de Sistemas", "state": "Pendiente"},
    { "id": 12, "code": "PRY2021213", "definition": "CoVMASPeru: Modelos multi agente para predecir la evolución de la pandemia en Perú Research & Games", "image": "assets/images/logos/Data-Center.png",
      "studies": "Ciencias de la Computación", "state": "Aprobado"},
    { "id": 13, "code": "PRY2021214", "definition": "Imagination: Generación de imágenes a partir de un texto Research & Games", "image": "assets/images/logos/Innova-TI.png",
      "studies": "Ingeniería de Sistemas", "state": "Rechazado"},
    { "id": 14, "code": "PRY2021215", "definition": "NAOEmotion: Generación de texto a partir de un sentimiento utilizando el robot NAO", "image": "assets/images/logos/IT-Consulting.png",
      "studies": "Ingeniería de Software", "state": "Pendiente"},
    { "id": 15, "code": "PRY2021216", "definition": "SmartAgro: pattern mining con computación evolutiva para extracción de patrones en agricultura", "image": "assets/images/logos/IT-Research.png",
      "studies": "Ingeniería de Sistemas", "state": "Pendiente"}
  ];
  name: string = "";
  titlecode: string = "";
  studies: string = "";
  objective: string = "Desarrollar modelos multi agente para la predicción de la evolución de la pandemia";
  petition: string = "Lentes de realidad Aumentada";
  description: string = "Se visualiza la descripción del Proyecto";
  image: string = "";
  powner: string = "WU";
  pmanager: string = "AB";
  coautor: string = "FS";
  isLoaded: Boolean = false;
  breadCrumbItems: Array<{}>;

  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.breadCrumbItems = [{ label: 'Asignación de Docentes' }, { label: 'Lista de Proyectos'}, { label: 'Detalles', active: true }];
    var code = this.route.snapshot.params.code
    this.titlecode = "Detalles del Proyecto " + code;
    var project = this.projects.filter(function(data){ return data.code == code })[0];
    this.name = project.definition;
    this.studies = project.studies;
    this.image = project.image;
    this.isLoaded = true;
  }

  goback() {
    this.router.navigate(['/projects-list']);
  }

  saveAsignation() {
    console.log(this.name);
    console.log(this.studies);
    console.log(this.objective);
    console.log(this.powner);
    console.log(this.pmanager);
    console.log(this.coautor);
    Swal.fire({
      title: 'Asignaciones Guardadas',
      text: 'Se guardó la asignación de Product Owner, Portfolio Manager y Co-Autor con éxito',
      icon: 'success',
      confirmButtonColor: '#EF360E',
    });
  }

}
