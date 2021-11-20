import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router';
import { HttpClient } from '@angular/common/http';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-project-details-asignation',
  templateUrl: './project-details-asignation.component.html',
  styleUrls: ['./project-details-asignation.component.scss']
})
export class ProjectDetailsAsignationComponent implements OnInit {
  projects: any[] = [];
  name: string = "";
  titlecode: string = "";
  studies: string = "";
  objective: string = "";
  petition: string = "";
  description: string = "";
  image: string = "";
  powner: string = "WU";
  pmanager: string = "AB";
  coautor: string = "FS";
  isLoaded: Boolean = false;
  breadCrumbItems: Array<{}>;

  constructor(private route: ActivatedRoute, private router: Router, private http: HttpClient) { }

  ngOnInit(): void {
    this.breadCrumbItems = [{ label: 'Asignación de Docentes' }, { label: 'Lista de Proyectos'}, { label: 'Detalles', active: true }];
    var code = this.route.snapshot.params.code
    this.titlecode = "Detalles del Proyecto " + code;
    this.getProjectsData().subscribe(data => {
      this.projects = Object.values(data)[0];
      var project = this.projects.filter(function(data){ return data.code == code })[0];
      this.name = project.name;
      this.studies = project.career.name;
      this.image = project.company.image;
      this.objective = project.general_objective;
      this.petition = "Lentes de realidad aumentada";
      this.description = project.description;
      this.isLoaded = true;
    });
  }

  getProjectsData() {
    return this.http.get("http://localhost:3000/api/v1.0/projects");
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
