import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { ProjectService } from 'src/app/core/services/project.service';

@Component({
  selector: 'app-project-details-review',
  templateUrl: './project-details-review.component.html',
  styleUrls: ['./project-details-review.component.scss']
})
export class ProjectDetailsReviewComponent implements OnInit {
  projects: any[] = [];
  name: string = '';
  titlecode: string = '';
  studies: string = '';
  objective: string = '';
  petition: string = '';
  description: string = '';
  image: string = '';
  isLoaded: boolean = false;
  breadCrumbItems: Array<{}>;

  constructor(private route: ActivatedRoute, private router: Router, private projectService: ProjectService) { }

  ngOnInit(): void {
    this.breadCrumbItems = [{ label: 'Proyectos' }, { label: 'Revisión de Proyectos'}, { label: 'Detalles', active: true }];
    var code = this.route.snapshot.params.code;
    this.titlecode = "Detalles del Proyecto " + code;
    this.projectService.getProjectsData().subscribe({
      error: (err) => console.log(err), 
      next: (rest) => { 
        this.projects = rest.data;
        var project = this.projects.filter(function(data){ return data.code == code })[0];
        this.name = project.name;
        this.studies = project.career.name;
        this.image = project.company.image;
        this.objective = project.general_objective;
        this.petition = 'Lentes de realidad aumentada';
        this.description = project.description;
        this.isLoaded = true;
      } 
    })
  }

  goback() {
    this.router.navigate(['/project-review']);
  }

  approved() {
    console.log(this.name);
    console.log(this.studies);
    console.log(this.objective);
    console.log(this.studies);
    console.log(this.petition);
    console.log(this.description);
    Swal.fire({
      title: 'Proyecto Aprobado',
      text: 'El proyecto fue aprobado con éxito',
      icon: 'success',
      confirmButtonColor: '#EF360E',
    });
  }

  rejected() {
    Swal.fire({
      title: 'Proyecto Rechazado',
      text: 'El proyecto fue rechazado',
      icon: 'error',
      confirmButtonColor: '#EF360E',
    });
  }

  comented() {
    Swal.fire({
      title: 'Proyecto Aprobado',
      text: 'El proyecto fue aprobado con comentarios',
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
