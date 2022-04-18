import { Component, OnInit } from '@angular/core';
import { CompanyService } from 'src/app/core/services/company.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-company-register',
  templateUrl: './company-register.component.html',
  styleUrls: ['./company-register.component.scss']
})
export class CompanyRegisterComponent implements OnInit {

  name: string = '';
  image: string = '';
  breadCrumbItems: Array<{}>;

  constructor(private companyService: CompanyService) { }

  ngOnInit(): void {
    this.breadCrumbItems = [{ label: 'Empresas Virtuales' }, { label: 'Añadir Empresa', active: true }];
  }

  successmsg() {
    var body = { name: '', image: '' };
    body['name'] = this.name;
    body['image'] = this.image;
    /*
    this.companyService.saveCompany(body).subscribe({
      error: (err) => console.log(err),
      next: (rest) => {
        Swal.fire({
          title: 'Empresa Registrada',
          text: 'La Empresa ha sido registrado exitosamente',
          icon: 'success',
          confirmButtonColor: '#EF360E',
        });
      }
    });*/
  }

}
