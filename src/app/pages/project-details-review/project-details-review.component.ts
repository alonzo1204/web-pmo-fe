import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { ProjectService } from 'src/app/core/services/project.service';
import { CompanyService } from 'src/app/core/services/company.service';
import { CareerService } from 'src/app/core/services/career.service';

@Component({
  selector: 'app-project-details-review',
  templateUrl: './project-details-review.component.html',
  styleUrls: ['./project-details-review.component.scss']
})
export class ProjectDetailsReviewComponent implements OnInit {
  projects: any[] = [];
  code: string = '';
  name: string = '';
  titlecode: string = '';
  studies: string = '';
  objective: string = '';
  objective_specific_one: string = '';
  objective_specific_two: string = '';
  objective_specific_three: string = '';
  objective_specific_four: string = '';
  file: string = '';
  sharepoint: string = '';
  petition: string = '';
  description: string = '';
  image: string = '';
  isLoaded: boolean = false;
  loading: boolean = false;
  breadCrumbItems: Array<{}>;

  records: any[] = [];
  companies: any[] = [];
  careers: any[] = [];

  constructor(private route: ActivatedRoute, private router: Router, private projectService: ProjectService, 
    private companyService: CompanyService, private careerService: CareerService) { }

  ngOnInit(): void {
    this.breadCrumbItems = [{ label: 'Proyectos' }, { label: 'Revisión de Proyectos'}, { label: 'Detalles', active: true }];
    var code = this.route.snapshot.params.code;
    this.companyService.getCompaniesData().subscribe({ next: (rest) => this.companies = rest.data });
    this.careerService.getCareersData().subscribe({ next: (rest) => this.careers = rest.data });
    this.titlecode = "Detalles del Proyecto " + code;
    this.loading = true;
    this.projectService.getProjectsData().subscribe({
      error: (err) => this.loading = false, 
      next: (rest) => { 
        this.projects = rest.data;
        console.log(this.projects)
        var project = this.projects.filter(function(data){ return data.code == code })[0];
        this.historyProjects(project.id);
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
        this.petition = 'Lentes de realidad aumentada';
        this.description = project.description;
        this.isLoaded = true;
        this.loading = false;
      } 
    })
  }

  goback() {
    this.router.navigate(['/project-review']);
  }

  approved(idProject: any) {
    /*console.log(this.name);
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
    });*/
    this.projectService.acceptProject(idProject).subscribe({
      error: (err) => console.log(err),
      next: (rest) => {
        Swal.fire({
          title: 'Proyecto Aprobado',
          text: 'El proyecto fue aprobado con éxito',
          icon: 'success',
          confirmButtonColor: '#EF360E',
          onClose: () => {  this.router.navigate(['/project-review']); }
        });
      }
    });
  }

  rejected(idProject: any) {
    /*Swal.fire({
      title: 'Proyecto Rechazado',
      text: 'El proyecto fue rechazado',
      icon: 'error',
      confirmButtonColor: '#EF360E',
    });*/
    this.projectService.deniedProject(idProject).subscribe({
      error: (err) => console.log(err),
      next: (rest) => {
        Swal.fire({
          title: 'Proyecto Rechazado',
          text: 'El proyecto fue rechazado',
          icon: 'error',
          confirmButtonColor: '#EF360E',
          onClose: () => {  this.router.navigate(['/project-review']); }
        });
      }
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

  historyProjects(id) {
    let params = { id_postulation_row: id }
    this.projectService.getHistoryProjects(params).subscribe({
      error: (err) => {
        this.loading = false;
        console.log(err);
      },
      next: (rest) => {
        this.records = rest.data;
        this.isLoaded = true;
        this.loading = false;
        console.log(rest)
      }
    });
  }

  searchCareerData(id): string {
    let career = this.careers.filter((item) => { return item.id == id })[0];
    return career.name;
  }

  searchCompanyData(id): string {
    let company = this.companies.filter((item) => { return item.id == id })[0];
    return company.image
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
