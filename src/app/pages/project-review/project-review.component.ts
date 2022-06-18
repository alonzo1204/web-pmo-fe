import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { ProjectService } from 'src/app/core/services/project.service';

@Component({
  selector: 'app-project-review',
  templateUrl: './project-review.component.html',
  styleUrls: ['./project-review.component.scss']
})
export class ProjectReviewComponent implements OnInit {

  page = 1;
  fileURL: any;
  pageSize = 10;
  projects: any[] = [];
  filter: any[] = [];
  keyword: string = '';
  number_projects!: number;
  isLoaded: boolean = false;
  loading: boolean = false;
  breadCrumbItems: Array<{}>;

  constructor(private router: Router, private projectService: ProjectService, private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.breadCrumbItems = [{ label: 'Revisión de Proyectos' }, { label: 'Lista de Proyectos', active: true }];
    this.loading = true;
    this.projectService.getProjectsbyStatusVarius([1, 2, 3, 4], [1, 2, 3]).subscribe({
      error: (err) => this.loading = false,
      next: (rest) => {
        this.projects = rest.data;
        this.number_projects = this.projects.length;
        this.filter = this.projects;
        this.onDownload(this.filter);
        this.isLoaded = true;
        this.loading = false;
        console.log(rest.data)
      }
    });
  }

  onStatusFilter(id: number) {
    switch (id) {
      case 1: this.filter = this.projects.filter(function (item) { return item.project_process_state.id == 1; }); break;
      case 2: this.filter = this.projects.filter(function (item) { return item.project_process_state.id == 2; }); break;
      case 3: this.filter = this.projects.filter(function (item) { return item.project_process_state.id == 3; }); break;
      case 4: this.filter = this.projects.filter(function (item) { return item.project_process_state.id == 4; }); break;
      default: this.filter = this.projects;
    }
    this.number_projects = this.filter.length;
  }

  nameStatus(id: number): string {
    switch (id) {
      case 1: return 'Pendiente de aprobación'; break;
      case 2: return 'Aprobado'; break;
      case 3: return 'Denegado'; break;
      case 4: return 'Aceptado con comentarios'; break;
      case 5: return 'Asignado'; break;
      default: return 'Pendiente de asignación de docentes';
    }
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

  onDownload(data: any) {
    let body = { data: data }
    this.projectService.downloadProjects(body).subscribe({
      error: (err) => this.loading = false,
      next: (rest) => {
        this.loading = false;
        // const str = JSON.stringify(rest);
        // const bytes = new TextEncoder().encode(str);
        // const blob = new Blob([bytes], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" })
        this.fileURL = this.sanitizer.bypassSecurityTrustResourceUrl(window.URL.createObjectURL(rest));
      }
    })
  }

  gotodetails(code: string) {
    console.log('here');

    this.router.navigate(['/project-details-review/' + code]);
  }

}
