import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ProjectService } from 'src/app/core/services/project.service';
import { CompanyService } from 'src/app/core/services/company.service';
import { CareerService } from 'src/app/core/services/career.service';
import { UserService } from 'src/app/core/services/user.service';
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

  records: any[] = [];
  teachers: any[] = [];
  companies: any[] = [];
  careers: any[] = [];

  product_owner: any;
  portfolio_manager: any;
  co_autor: any;

  constructor(private route: ActivatedRoute, private router: Router, private projectService: ProjectService, private userService: UserService, 
    private companyService: CompanyService, private careerService: CareerService) { }

  ngOnInit(): void {
    this.breadCrumbItems = [{ label: 'Asignación de Docentes' }, { label: 'Lista de Proyectos' }, { label: 'Detalles', active: true }];
    var code = this.route.snapshot.params.code
    this.companyService.getCompaniesData().subscribe({ next: (rest) => this.companies = rest.data });
    this.careerService.getCareersData().subscribe({ next: (rest) => this.careers = rest.data });
    this.titlecode = "Detalles del Proyecto " + code;
    this.loading = true;
    this.projectService.getProjectsData().subscribe({
      error: (err) => this.loading = false,
      next: (rest) => {
        this.projects = rest.data;
        var project = this.projects.filter(function (data) { return data.code == code })[0];
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
        this.petition = "Lentes de realidad aumentada";
        this.description = project.description;
        this.userService.getTeachersData().subscribe({
          error: (e) => this.loading = false,
          next: (response) => {
            this.teachers = response.data;
            this.isLoaded = true;
            this.loading = false;
            console.log(this.teachers);
          }
        })
      }
    });

  }

  goback() {
    this.router.navigate(['/projects-list']);
  }

  saveAsignation() {
    if (!this.product_owner || !this.portfolio_manager || !this.co_autor) {
      Swal.fire({
        title: 'Asignar todos los docentes',
        text: 'Se debe enviar todos los docentes que estarán relacionados con el proyecto',
        icon: 'error',
        confirmButtonColor: '#EF360E',
      });
    } else {
      this.loading = true;
      const body = {
        code: this.code,
        product_owner_id: this.product_owner.id,
        portfolio_manager_id: this.portfolio_manager.id,
        co_autor_id: this.co_autor.id,
      }

      this.projectService.saveTeachers(body).subscribe({
        error: (e) => {
          this.loading = false;
          Swal.fire({
            title: 'Asignar todos los docentes',
            text: e,
            icon: 'error',
            confirmButtonColor: '#EF360E',
          });
        },
        next: (response) => {
          this.loading = false;
          Swal.fire({
            title: 'Asignaciones Guardadas',
            text: 'Se guardó la asignación de Product Owner, Portfolio Manager y Co-Autor con éxito',
            icon: 'success',
            confirmButtonColor: '#EF360E',
            onClose: () => {
              this.goback();
            }
          });
        }
      })


    }
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

  searchTeacher = (text$: Observable<string>) => text$
    .debounceTime(200)
    .distinctUntilChanged()
    .map(term => term.length < 2 ? [] : this.teachers.filter(v => v.fullInformation.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10))

  formatValueList = (value: any) => {
    return value.fullInformation;
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
