import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import { CareerService } from 'src/app/core/services/career.service';
import { CompanyService } from 'src/app/core/services/company.service';
import { ProjectService } from 'src/app/core/services/project.service';
import { GroupService } from 'src/app/core/services/group.service';
import { PostulationService } from 'src/app/core/services/postulation.service';

@Component({
  selector: 'app-project-portfolio',
  templateUrl: './project-portfolio.component.html',
  styleUrls: ['./project-portfolio.component.scss']
})
export class ProjectPortfolioComponent implements OnInit {

  page = 1;
  pageSize = 10;
  keyword: string = "";
  number_projects: number;
  filter: any[] = [];
  projects: any[] = [];
  addedprojects: any[] = [];
  isLoaded: boolean = false;
  n_addeds: number = 0;
  canadd: boolean = true;
  canpostulate: boolean = false;
  breadCrumbItems: Array<{}>;

  careers: any[] = [];
  companies: any[] = [];

  mygroup: any;
  groupLoaded: boolean = true;

  button_state: boolean = false;
  loading: boolean = false;

  constructor(private router: Router, private modalService: NgbModal, private projectService: ProjectService, private postulationService: PostulationService,
    private companyService: CompanyService, private careerService: CareerService, private groupService: GroupService) { }

  ngOnInit(): void {
    this.breadCrumbItems = [{ label: 'Postulación' }, { label: 'Cartera de Proyectos', active: true }];
    this.companyService.getCompaniesData().subscribe({ error: (err) => console.log(err), next: (rest) => this.companies = rest.data });
    this.careerService.getCareersData().subscribe({ error: (err) => console.log(err), next: (rest) => this.careers = rest.data });
    let user = JSON.parse(localStorage.getItem('currentUser')!).user.information;
    this.loading = true;
    this.groupService.getMyGroup(user.code).subscribe({
      error: (err) => console.log(err),
      next: (rest) => { this.mygroup = rest.data[0]; if (this.mygroup) this.groupLoaded = true; else this.groupLoaded = false; }
    });
    this.projectService.getProjectsbyStatusVarius([2, 4], [1, 2, 3]).subscribe({
      error: (err) => this.loading = false,
      next: (rest) => {
        this.projects = rest.data;
        this.number_projects = this.projects.length;
        this.projects.forEach(function (element) { element.added = false; });
        this.filter = this.projects;
        this.isLoaded = true;
        this.loading = false;
      }
    });
  }

  openConfirmationModal(confirmationModal: any) {
    this.modalService.open(confirmationModal, { centered: true, size: 'lg' });
  }

  onStatusFilter(id: number) {
    switch (id) {
      case 1: this.filter = this.projects.filter(function (item) { return item.project_process_state.id == 2; }); break;
      case 2: this.filter = this.projects.filter(function (item) { return item.project_process_state.id == 4; }); break;
      default: this.filter = this.projects;
    }
    this.number_projects = this.filter.length;
  }

  onSearchFilter(keyword: string) {
    this.filter = this.projects.filter(function (item) {
      return (item.code.toLowerCase().includes(keyword.toLowerCase()) ||
        item.name.toLowerCase().includes(keyword.toLowerCase()) ||
        item.company.name.toLowerCase().includes(keyword.toLowerCase()) ||
        item.career.name.toLowerCase().includes(keyword.toLowerCase()));
    });
    this.number_projects = this.filter.length;
  }

  gotodetails(code: any) {
    this.router.navigate(['/project-details-portfolio/' + code]);
  }

  addProject(project: any): void {
    this.projects[this.projects.indexOf(project)].added = true;
    this.addedprojects.push(this.projects[this.projects.indexOf(project)]);
    this.n_addeds = this.n_addeds + 1;
    if (this.n_addeds >= 4) { this.canadd = false; this.canpostulate = true; }
  }

  removeProject(project: any): void {
    this.projects[this.projects.indexOf(project)].added = false;
    var removeIndex = this.addedprojects.map(item => item.id).indexOf(project.id);
    ~removeIndex && this.addedprojects.splice(removeIndex, 1);
    this.n_addeds = this.n_addeds - 1;
    if (this.n_addeds < 4) { this.canadd = true; this.canpostulate = false; }
  }

  postular(): void {
    let body = { "group_id": 0, "project_1_id": 0, "project_2_id": 0, "project_3_id": 0, "project_4_id": 0 };
    console.log(this.mygroup);

    body['group_id'] = this.mygroup.group_id;
    body['project_1_id'] = this.addedprojects[0].id;
    body['project_2_id'] = this.addedprojects[1].id;
    body['project_3_id'] = this.addedprojects[2].id;
    body['project_4_id'] = this.addedprojects[3].id;
    this.button_state = true;
    this.loading = true;
    this.postulationService.savePostulation(body).subscribe({
      error: (err) => {
        console.log(err);
        this.button_state = false;
        this.loading = false;
        Swal.fire({
          title: 'No se pudo realizar la postulación',
          text: err ? err : 'Ha ocurrido un error',
          icon: 'error',
          confirmButtonColor: '#E42322',
        });
      },
      next: (rest) => {
        Swal.fire({
          title: 'Postulación enviada',
          text: 'Su postulación ha sido enviada con éxito',
          icon: 'success',
          confirmButtonColor: '#EF360E',
        });
      },
      complete: () => this.cleanprocess()
    });
  }

  cleanprocess() {
    this.addedprojects = []; this.n_addeds = 0;
    this.canadd = true; this.canpostulate = false;
    this.button_state = false;
    this.loading = false;
    this.projects.forEach(function (element) { element.added = false; });
  }

  /*
  requestProjects(): void {
    var count: number = 0;
    var projects: any[] = [];
    while (count < this.addedprojects.length){
      var request = { code: this.addedprojects[count].code, name: this.addedprojects[count].name, 
        career: this.addedprojects[count].career.name, image: this.addedprojects[count].company.image, status: 'pendiente' };
      projects.push(request);
      count++;
    }
    this.insertLocalStorage(projects);
  }

  insertLocalStorage(projects): void {
    var listPostulation = JSON.parse(localStorage.getItem('postulations')!);
    var requestPostulation: any[] = [];

    if (listPostulation != undefined) requestPostulation = listPostulation;
    var postulation = { code: "POS" + this.makeid(8), date: new Date(), status: 'pendiente', projects: projects };
    requestPostulation.push(postulation);

    localStorage.setItem('postulations', JSON.stringify(requestPostulation));
    console.log(requestPostulation);
  }
  */

  makeid(length) {
    var result = '';
    var characters = '0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  groupregister() {
    this.router.navigate(['/group-register']);
  }

}
