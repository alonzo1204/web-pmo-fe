import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-bulk-upload-users',
  templateUrl: './bulk-upload-users.component.html',
  styleUrls: ['./bulk-upload-users.component.scss']
})
export class BulkUploadUsersComponent implements OnInit {

  type_upload: number = 1;
  breadCrumbItems: Array<{}>;

  typeUploades = [
    //{ id: 0, name: 'Seleccione un Tipo de Carga Masiva' },
    { id: 1, name: 'Usuarios Habilitados' },
    { id: 2, name: 'Usuarios Bloqueados' }
  ]

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.breadCrumbItems = [{ label: 'Usuarios' }, { label: 'Añadir Usuario'}, { label: 'Carga Masiva de Usuarios', active: true }];
  }

  goback() {
    this.router.navigate(['/user-register']);
  }

}
