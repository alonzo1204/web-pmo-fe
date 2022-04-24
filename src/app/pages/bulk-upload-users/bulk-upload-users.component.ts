import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { DropzoneConfigInterface } from 'ngx-dropzone-wrapper';
import { UserService } from 'src/app/core/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-bulk-upload-users',
  templateUrl: './bulk-upload-users.component.html',
  styleUrls: ['./bulk-upload-users.component.scss']
})
export class BulkUploadUsersComponent implements OnInit {

  form: FormGroup;
  button_state: boolean = false;
  type_upload: number = 1;
  breadCrumbItems: Array<{}>;

  config: DropzoneConfigInterface = {
    clickable: true,
    maxFiles: 1,
  }

  typeUploades = [
    //{ id: 0, name: 'Seleccione un Tipo de Carga Masiva' },
    { id: 1, name: 'Usuarios Habilitados' },
    { id: 2, name: 'Usuarios Bloqueados' }
  ]

  constructor(private router: Router, private formBuilder: FormBuilder, private userService: UserService) {
    this.form = this.formBuilder.group({
      file: [null]
    });
  }

  ngOnInit(): void {
    this.breadCrumbItems = [{ label: 'Usuarios' }, { label: 'Añadir Usuario'}, { label: 'Carga Masiva de Usuarios', active: true }];
  }

  onUploadSuccess(event) {
    const file = event[0];
    this.form.patchValue({ file: file });
    this.form.get('file').updateValueAndValidity();
  }

  successmsg() {
    var formData: any = new FormData();
    formData.append('file', this.form.get('file').value);

    this.button_state = true;
    let select_service = this.type_upload == 1 ? this.userService.saveMasiveRegister(formData) : this.userService.saveMasiveRegisterLocked(formData);
    select_service.subscribe({
      error: (err) => {
        console.log(err),
        this.button_state = false;
        Swal.fire({
          title: 'Archivo Excel no pudo subido',
          text: 'Verifique llenar los campos correctamente',
          icon: 'error',
          confirmButtonColor: '#E42322',
        });
      },
      next: (rest) => {
        Swal.fire({
          title: 'Archivo Excel subido',
          text: 'El archivo Excel ha sido subido exitosamente',
          icon: 'success',
          confirmButtonColor: '#EF360E',
        });
      }, 
      complete: () => this.cleanprocess()
    });
  }
  
  cleanprocess() {
    this.button_state = false;
    this.type_upload = 1;
  }

  goback() {
    this.router.navigate(['/user-register']);
  }

}
