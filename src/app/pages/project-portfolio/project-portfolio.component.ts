import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import { ProjectService } from 'src/app/core/services/project.service';

@Component({
  selector: 'app-project-portfolio',
  templateUrl: './project-portfolio.component.html',
  styleUrls: ['./project-portfolio.component.scss']
})
export class ProjectPortfolioComponent implements OnInit {
  page = 1;
  number_projects: number = 50;
  pageSize = 10;
  keyword: string = "";
  projects: any[] = [];
  addedprojects: any[] = [];
  filter: any[] = [];
  isLoaded: boolean = false;
  n_addeds: number = 0;
  canadd: boolean = true;
  canpostulate: boolean = false;
  breadCrumbItems: Array<{}>;

  constructor(private router: Router, private modalService: NgbModal, private projectService: ProjectService) { }

  ngOnInit(): void {
    this.breadCrumbItems = [{ label: 'Postulación' }, { label: 'Cartera de Proyectos', active: true }];
    this.projectService.getProjectsData().subscribe({
      error: (err) => console.log(err), 
      next: (rest) => { 
        this.projects = rest.data;
        this.number_projects = this.projects.length;
        this.projects.forEach(function (element) { element.added = false; });
        this.filter = this.projects;
        this.isLoaded = true;
      } 
    });
  }

  openConfirmationModal(confirmationModal: any) {
    this.modalService.open(confirmationModal, { centered: true, size: 'lg'});
  }

  onStatusFilter(id: number) {
    switch(id) {
      case 1: this.filter = this.projects.filter(function(item){ return item.project_process_state.id == 1; }); break;
      case 2: this.filter = this.projects.filter(function(item){ return item.project_process_state.id == 2; }); break;
      default: this.filter = this.projects;
    }
    this.number_projects = this.filter.length;
  }

  onSearchFilter(keyword: string) {
    this.filter = this.projects.filter(function(item){
      return (item.code.toLowerCase().includes(keyword.toLowerCase()) || 
      item.name.toLowerCase().includes(keyword.toLowerCase()) || 
      item.company.name.toLowerCase().includes(keyword.toLowerCase()) || 
      item.career.name.toLowerCase().includes(keyword.toLowerCase()));
    });
    this.number_projects = this.filter.length;
  }

  gotodetails(id: number) {
    this.router.navigate(['/project-details-portfolio/'+this.projects[id-1].code]);
  }

  addProject(id): void {
    this.projects[id-1].added = true;
    this.addedprojects.push(this.projects[id-1]);
    this.n_addeds = this.n_addeds + 1;
    if (this.n_addeds >= 4) { this.canadd = false; this.canpostulate = true; }
  }

  removeProject(id): void {
    this.projects[id-1].added = false;
    var removeIndex = this.addedprojects.map(item => item.id).indexOf(id);
    ~removeIndex && this.addedprojects.splice(removeIndex, 1);
    this.n_addeds = this.n_addeds - 1;
    if (this.n_addeds < 4) { this.canadd = true; this.canpostulate = false; }
  }

  postular(): void {
    this.requestProjects();
    this.addedprojects = []; this.n_addeds = 0;
    this.canadd = true; this.canpostulate = false;
    this.projects.forEach(function (element) {element.added = false;});
    Swal.fire({
      title: 'Postulación enviada',
      text: 'Su postulación ha sido enviada con éxito',
      icon: 'success',
      confirmButtonColor: '#EF360E',
    });
  }

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

  makeid(length) {
    var result = '';
    var characters = '0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

}
