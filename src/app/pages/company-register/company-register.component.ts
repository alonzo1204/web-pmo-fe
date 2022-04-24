import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
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
  breadCrumbItems: Array<{}>;

  config: DropzoneConfigInterface = {
    clickable: true,
    maxFiles: 1,
  }

  constructor(private formBuilder: FormBuilder, private companyService: CompanyService) { 
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

  successmsg() {
    var formData: any = new FormData();
    formData.append('name', this.form.get('name').value);
    formData.append('image', this.form.get('image').value);

    this.button_state = true;
    this.companyService.saveCompany(formData).subscribe({
      error: (err) => {
        console.log(err),
        this.button_state = false;
        Swal.fire({
          title: 'Empresa no pudo Registrarse',
          text: 'Verifique llenar los campos correctamente',
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
        });
      },
      complete: () => this.cleanprocess()
    });
  }

  cleanprocess() {
    this.button_state = false
    this.form.patchValue({ name: '', image: null });
  }

}
