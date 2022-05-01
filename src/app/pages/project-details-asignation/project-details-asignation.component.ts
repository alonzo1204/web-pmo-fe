import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { timeStamp } from 'console';
import { ProjectService } from 'src/app/core/services/project.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-project-details-asignation',
  templateUrl: './project-details-asignation.component.html',
  styleUrls: ['./project-details-asignation.component.scss']
})
export class ProjectDetailsAsignationComponent implements OnInit {
  projects: any[] = [];
  code: string = ''
  name: string = "";
  titlecode: string = "";
  studies: string = "";
  objective: string = "";
  objective_specific_one: string = '';
  objective_specific_two: string = '';
  objective_specific_three: string = '';
  objective_specific_four: string = '';
  file: string = '';
  sharepoint: string = '';
  petition: string = "";
  description: string = "";
  image: string = "";
  powner: string = "WU";
  pmanager: string = "AB";
  coautor: string = "FS";
  isLoaded: Boolean = false;
  loading: boolean = false;
  breadCrumbItems: Array<{}>;

  constructor(private route: ActivatedRoute, private router: Router, private projectService: ProjectService) { }

  ngOnInit(): void {
    this.breadCrumbItems = [{ label: 'Asignación de Docentes' }, { label: 'Lista de Proyectos'}, { label: 'Detalles', active: true }];
    var code = this.route.snapshot.params.code
    this.titlecode = "Detalles del Proyecto " + code;
    this.loading = true;
    this.projectService.getProjectsData().subscribe({
      error: (err) => this.loading = false, 
      next: (rest) => { 
        this.projects = rest.data;
        var project = this.projects.filter(function(data){ return data.code == code })[0];
        this.code = project.code;
        this.name = project.name;
        this.studies = project.career.name;
        this.image = project.company.image;
        this.objective = project.general_objective;
        this.objective_specific_one = project.specific_objective_1;
        this.objective_specific_two = project.specific_objective_2;
        this.objective_specific_three = project.specific_objective_3;
        this.objective_specific_four = project.specific_objective_4;
        this.file = project.url_file;
        this.sharepoint = project.url_sharepoint;
        this.petition = "Lentes de realidad aumentada";
        this.description = project.description;
        this.isLoaded = true;
        this.loading = false;
      }
    });
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

  downloadMyFile() {
    const link = document.createElement('a');
    link.setAttribute('target', '_blank');
    link.setAttribute('href', '../../../assets/file.docx');
    link.setAttribute('download', `file.docx`);
    document.body.appendChild(link);
    link.click();
    link.remove();
  }

}
