import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { DropzoneConfigInterface } from 'ngx-dropzone-wrapper';
import { ProjectService } from 'src/app/core/services/project.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-bulk-upload-projects',
  templateUrl: './bulk-upload-projects.component.html',
  styleUrls: ['./bulk-upload-projects.component.scss']
})
export class BulkUploadProjectsComponent implements OnInit {

  form: FormGroup;
  button_state: boolean = false;
  loading: boolean = false;
  breadCrumbItems: Array<{}>;

  config: DropzoneConfigInterface = {
    clickable: true,
    maxFiles: 1,
  }

  constructor(private router: Router, private formBuilder: FormBuilder, private projectService: ProjectService) { 
    this.form = this.formBuilder.group({
      file: [null]
    });
  }

  ngOnInit(): void {
    this.breadCrumbItems = [{ label: 'Proyectos' }, { label: 'Añadir Proyecto'}, { label: 'Carga Masiva de Proyectos', active: true }];
  }

  onUploadSuccess(event) {
    const file = event[0];
    this.form.patchValue({ file: file });
    this.form.get('file').updateValueAndValidity();
  }

  validate(): boolean {
    if (this.form.get('file').value == '' || this.form.get('file').value == null || this.form.get('file').value == undefined) {
      return false;
    }
    return true
  }

  successmsg() {
    if(this.validate()) {
      var formData: any = new FormData();
      formData.append('file', this.form.get('file').value);
      //console.log(this.form.get('file').value)
      this.button_state = true;
      this.loading = true;
      this.projectService.saveMasiveRegister(formData).subscribe({
        error: (err) => {
          console.log(err),
          this.button_state = false;
          this.loading = false;
          Swal.fire({
            title: 'Archivo Excel no pudo subido',
            text: err,
            icon: 'error',
            confirmButtonColor: '#E42322',
          });
        },
        next: (rest) => {
          Swal.fire({
            title: 'Archivo Excel subido',
            text: 'El archivo Excel ha sido subido exitosamente',
            icon: 'success',
            timer: 2500
            //confirmButtonColor: '#EF360E',
          });
          setTimeout(() => this.goback(), 2500);
        }, 
        complete: () => this.cleanprocess()
      });
    } else {
      Swal.fire({
        title: 'Es necesario subir un archivo',
        text: 'Todos los campos son obligatorios',
        icon: 'error',
        confirmButtonColor: '#E42322',
      });
    }
  }

  cleanprocess() {
    this.loading = false;
    this.button_state = false;
  }

  goback() {
    this.router.navigate(['/project-review']);
  }
  
}
