import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SemesterService } from 'src/app/core/services/semester.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-semester-register',
  templateUrl: './semester-register.component.html',
  styleUrls: ['./semester-register.component.scss']
})
export class SemesterRegisterComponent implements OnInit {

  name: string = '';
  date_from: string = '';
  date_until: string = '';
  button_state: boolean = false;
  loading: boolean = false;
  breadCrumbItems: Array<{}>; 

  constructor(private semesterService: SemesterService, private router: Router) { }

  ngOnInit(): void {
    this.breadCrumbItems = [{ label: 'Semestres' }, { label: 'Añadir Semestre', active: true }]; 
  }

  validate(): boolean {
    if (this.name == '' || this.date_from == '' || this.date_until == '') { return false; }
    return true
  }

  successmsg() {
    if(this.validate()) {
      var body = { name: '', date_from: '', date_until: '' };
      body['name'] = this.name;
      body['date_from'] = this.date_from;
      body['date_until'] = this.date_until;
      this.button_state = true;
      this.loading = true;
      this.semesterService.saveSemester(body).subscribe({
        error: (err) => { 
          this.loading = false;
          this.button_state = false;
          Swal.fire({
            title: 'Semestre no pudo Registrarse',
            text: err,
            icon: 'error',
            confirmButtonColor: '#E42322',
          });
        }, 
        next: (rest) => {
          Swal.fire({
            title: 'Semestre Registrado',
            text: 'El semestre ha sido registrado exitosamente',
            icon: 'success',
            confirmButtonColor: '#EF360E',
            onClose: () => {
              this.router.navigate(['/semesters-list']);
            }
          });
          this.loading = false;
          this.button_state = false;
        }
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
    this.name = ''; this.date_from = ''; this.date_until = '';
  }

}
