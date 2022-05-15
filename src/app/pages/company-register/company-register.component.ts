import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { DropzoneConfigInterface, DropzoneDirective } from 'ngx-dropzone-wrapper';
import { CompanyService } from 'src/app/core/services/company.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-company-register',
  templateUrl: './company-register.component.html',
  styleUrls: ['./company-register.component.scss']
})
export class CompanyRegisterComponent implements OnInit {

  form: FormGroup;
  button_state: boolean = false;
  loading: boolean = false;
  breadCrumbItems: Array<{}>;

  config: DropzoneConfigInterface = {
    clickable: true,
    maxFiles: 1,
  }

  constructor(private formBuilder: FormBuilder, private companyService: CompanyService, private router: Router) {
    this.form = this.formBuilder.group({
      name: [''],
      image: [null]
    });
  }

  ngOnInit(): void {
    this.breadCrumbItems = [{ label: 'Empresas Virtuales' }, { label: 'Añadir Empresa', active: true }];
  }

  onUploadSuccess(event) {
    const file = event[0];
    this.form.patchValue({ image: file });
    this.form.get('image').updateValueAndValidity();
  }

  validate(): boolean {
    if (this.form.get('name').value == '' || this.form.get('image').value == '' || this.form.get('image').value == null || 
    this.form.get('image').value == undefined) {
      return false;
    }
    return true
  }

  successmsg() {
    if(this.validate()) {
      var formData: any = new FormData();
      formData.append('name', this.form.get('name').value);
      formData.append('image', this.form.get('image').value);

      this.button_state = true;
      this.loading = true;
      this.companyService.saveCompany(formData).subscribe({
        error: (err) => {
          console.log(err),
          this.button_state = false;
          this.loading = false;
          Swal.fire({
            title: 'Empresa no pudo Registrarse',
            text: err,
            icon: 'error',
            confirmButtonColor: '#E42322',
          });
        },
        next: (rest) => {
          Swal.fire({
            title: 'Empresa Registrada',
            text: 'La Empresa ha sido registrado exitosamente',
            icon: 'success',
            confirmButtonColor: '#EF360E',
            onClose: () => {
              this.router.navigate(['/companies-list']);
            }
          });
        },
        complete: () => this.cleanprocess()
      });
    } else {
      Swal.fire({
        title: 'Complete el formulario',
        text: 'Todos los campos son obligatorios',
        icon: 'error',
        confirmButtonColor: '#E42322',
      });
    }
  }

  cleanprocess() {
    this.loading = false;
    this.button_state = false;
    this.form.patchValue({ name: '', image: null });
  }

}
