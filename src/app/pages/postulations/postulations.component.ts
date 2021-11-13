import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-postulations',
  templateUrl: './postulations.component.html',
  styleUrls: ['./postulations.component.scss']
})
export class PostulationsComponent implements OnInit {
  postulations: any[] = [
    { "id": 0, "code": "PRY2021201", "definition": "CoVMASPeru: Modelos multi agente para predecir la evolución de la pandemia en Perú Research & Games", "image": "assets/images/logos/Data-Center.png"},
    { "id": 1, "code": "PRY2021202", "definition": "Imagination: Generación de imágenes a partir de un texto Research & Games", "image": "assets/images/logos/Innova-TI.png"},
    { "id": 2, "code": "PRY2021203", "definition": "NAOEmotion: Generación de texto a partir de un sentimiento utilizando el robot NAO", "image": "assets/images/logos/IT-Consulting.png"},
    { "id": 3, "code": "PRY2021204", "definition": "SmartAgro: pattern mining con computación evolutiva para extracción de patrones en agricultura", "image": "assets/images/logos/IT-Research.png"}
  ];
  breadCrumbItems: Array<{}>;

  constructor(private router: Router) { }

  gotodetails(id) {
    this.router.navigate(['/project-details/'+this.postulations[id].code]);
  }

  ngOnInit(): void {
    this.breadCrumbItems = [{ label: 'Postulaciones Cerradas' }, { label: 'Lista de Proyectos', active: true }];
  }

}
