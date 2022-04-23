import { Component, OnInit } from '@angular/core';
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

  constructor(private semesterService: SemesterService, private portfolioService: PortfolioService) { }

  ngOnInit(): void {
    this.breadCrumbItems = [{ label: 'Portafolio' }, { label: 'Añadir Portafolio', active: true }];
    this.semesterService.getSemestersData().subscribe({ error: (err) => console.log(err), next: (rest) => this.semesters = rest.data });
  }

  successmsg() {
    var body = { name: '', semester_id: 0, portfolio_state_id: 0 };
    body['name'] = this.name;
    body['semester_id'] = this.semester;
    body['portfolio_state_id'] = this.portfolio_stated;
    
    this.portfolioService.savePortfolio(body).subscribe({
      error: (err) => console.log(err), 
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
    this.name = ''; this.semester = 1; this.portfolio_stated = 1;
  }

}
