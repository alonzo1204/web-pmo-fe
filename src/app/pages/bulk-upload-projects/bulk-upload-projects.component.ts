import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-bulk-upload-projects',
  templateUrl: './bulk-upload-projects.component.html',
  styleUrls: ['./bulk-upload-projects.component.scss']
})
export class BulkUploadProjectsComponent implements OnInit {

  breadCrumbItems: Array<{}>;

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.breadCrumbItems = [{ label: 'Proyectos' }, { label: 'Añadir Proyecto'}, { label: 'Carga Masiva de Proyectos', active: true }];
  }

  goback() {
    this.router.navigate(['/add-project']);
  }
  
}
