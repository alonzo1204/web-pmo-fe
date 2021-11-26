import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient } from '@angular/common/http';

import Swal from 'sweetalert2';

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

  constructor(private router: Router, private http: HttpClient, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.breadCrumbItems = [{ label: 'Postulación' }, { label: 'Cartera de Proyectos', active: true }];
    this.getProjectsData().subscribe(data => {
      this.projects = Object.values(data)[0];
      this.number_projects = this.projects.length;
      this.projects.forEach(function (element) {element.added = false;});
      this.filter = this.projects;
      this.isLoaded = true;
    });
  }

  openConfirmationModal(confirmationModal: any) {
    this.modalService.open(confirmationModal, { centered: true, size: 'lg'});
  }

  getProjectsData() {
    return this.http.get("http://localhost:3000/api/v1.0/projects");
  }

  FiltrarTodos(): void {
    this.filter = this.projects;
  }

  FiltrarAsignados(): void {
    this.filter = this.projects.filter(function(item){return item.project_process_state.id == 2;});
  }

  FiltrarPendientes(): void {
    this.filter = this.projects.filter(function(item){return item.project_process_state.id == 1;});
  }

  onSearchFilter(keyword: string) {
    this.filter = this.projects.filter(function(item){
      return (item.code.toLowerCase().includes(keyword.toLowerCase()) || 
      item.name.toLowerCase().includes(keyword.toLowerCase()) || 
      item.company.name.toLowerCase().includes(keyword.toLowerCase()) || 
      item.career.name.toLowerCase().includes(keyword.toLowerCase()));
    });
  }

  gotodetails(id) {
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
    Swal.fire({
      title: 'Postulación enviada',
      text: 'Su postulación ha sido enviada con éxito',
      icon: 'success',
      confirmButtonColor: '#EF360E',
    });
  }
}
