import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-project-review',
  templateUrl: './project-review.component.html',
  styleUrls: ['./project-review.component.scss']
})
export class ProjectReviewComponent implements OnInit {
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
  filter: any[] = [];
  isLoaded: boolean = false;
  title: string = "Todos";
  breadCrumbItems: Array<{}>;

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.filter = this.projects;
    this.isLoaded = true;
    this.breadCrumbItems = [{ label: 'Proyectos' }, { label: 'Revisión de Proyectos', active: true }];
  }

  FiltrarTodos(): void {
    this.filter = this.projects;
    this.title = "Todos";
  }

  FiltrarAprobados(): void {
    this.filter = this.projects.filter(function(item){return item.state == "Aprobado";});
    this.title = "Aprobados";
  }

  FiltrarPendientes(): void {
    this.filter = this.projects.filter(function(item){return item.state == "Pendiente";});
    this.title = "Pendientes";
  }

  FiltrarRechazados(): void {
    this.filter = this.projects.filter(function(item){return item.state == "Rechazado";});
    this.title = "Rechazados";
  }

  gotodetails(id) {
    this.router.navigate(['/project-details-review/'+this.projects[id].code]);
  }

}
