import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PortfolioService } from 'src/app/core/services/portfolio.service';
import { SemesterService } from 'src/app/core/services/semester.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-portfolio-register',
  templateUrl: './portfolio-register.component.html',
  styleUrls: ['./portfolio-register.component.scss']
})
export class PortfolioRegisterComponent implements OnInit {

  name: string = '';
  semester: number = 1;
  portfolio_stated: number = 1;
  semesters: any[] = [];
  breadCrumbItems: Array<{}>;

  button_state: boolean = false;
  loading: boolean = false;

  constructor(private semesterService: SemesterService, private router: Router, private portfolioService: PortfolioService) { }

  ngOnInit(): void {
    this.breadCrumbItems = [{ label: 'Portafolio' }, { label: 'Añadir Portafolio', active: true }];
    this.semesterService.getSemestersData().subscribe({ error: (err) => console.log(err), next: (rest) => this.semesters = rest.data });
  }

  successmsg() {
    var body = { name: '', semester_id: 0, portfolio_state_id: 0 };
    body['name'] = this.name;
    body['semester_id'] = this.semester;
    body['portfolio_state_id'] = this.portfolio_stated;

    this.button_state = true;
    this.loading = true;
    this.portfolioService.savePortfolio(body).subscribe({
      error: (err) => {
        console.log(err),
          this.button_state = false;
        this.loading = false;
        Swal.fire({
          title: 'Portafolio no pudo Registrarse',
          text: 'Verifique llenar los campos correctamente',
          icon: 'error',
          confirmButtonColor: '#E42322',
        });
      },
      next: (rest) => {
        Swal.fire({
          title: 'Portafolio Registrado',
          text: 'El Portafolio fue registrado satisfactoriamente',
          icon: 'success',
          confirmButtonColor: '#EF360E',
        });
      },
      complete: () => this.cleanprocess()
    });
  }

  cleanprocess() {
    this.loading = false;
    this.button_state = false;
    this.name = ''; this.semester = 1; this.portfolio_stated = 1;
    this.router.navigate(['/portfolios-list']);
  }

}
