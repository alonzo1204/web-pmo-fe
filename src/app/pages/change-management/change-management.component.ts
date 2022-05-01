import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProjectService } from 'src/app/core/services/project.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-change-management',
  templateUrl: './change-management.component.html',
  styleUrls: ['./change-management.component.scss']
})
export class ChangeManagementComponent implements OnInit {
  project: any;
  projects: any[] = [];
  isLoaded: Boolean = false;
  loading: boolean = false;
  detalles: string = "";
  cambio: string = "CNP";

  constructor(private route: ActivatedRoute, private projectService: ProjectService) { }

  ngOnInit(): void {
    var code = this.route.snapshot.params.code
    this.loading = true;
    this.projectService.getProjectsData().subscribe({
      error: (err) => console.log(err), 
      next: (rest) => { 
        this.projects = rest.data;
        this.project = this.projects.filter(function(data){ return data.code == code })[0];
        this.isLoaded = true;
        this.loading = false;
      }
    });
  }

  successmsg() {
    console.log(this.detalles);
    console.log(this.cambio);
    Swal.fire({
      title: 'Gestión de cambio enviada',
      text: 'Tu gestión sera evaluada en  el transcurso de los dias',
      icon: 'success',
      confirmButtonColor: '#EF360E',
    });
  }
}
