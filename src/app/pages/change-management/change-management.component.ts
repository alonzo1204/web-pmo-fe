import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-change-management',
  templateUrl: './change-management.component.html',
  styleUrls: ['./change-management.component.scss']
})
export class ChangeManagementComponent implements OnInit {
  project: any;
  projects: any[] = [];
  isLoaded: Boolean = false;
  detalles: string = "";
  cambio: string = "CNP";

  constructor(private route: ActivatedRoute, private http: HttpClient) { }

  ngOnInit(): void {
    var code = this.route.snapshot.params.code
    this.getProjectsData().subscribe(data => {
      this.projects = Object.values(data)[0];
      this.project = this.projects.filter(function(data){ return data.code == code })[0];
      this.isLoaded = true;
    });
  }

  getProjectsData() {
    return this.http.get("http://localhost:3000/api/v1.0/projects");
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
