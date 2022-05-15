import { Component, OnInit } from '@angular/core';
import { SemesterService } from 'src/app/core/services/semester.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-semester-register',
  templateUrl: './semester-register.component.html',
  styleUrls: ['./semester-register.component.scss']
})
export class SemesterRegisterComponent implements OnInit {

  name: string = '';
  button_state: boolean = false;
  loading: boolean = false;
  breadCrumbItems: Array<{}>; 

  constructor(private semesterService: SemesterService) { }

  ngOnInit(): void {
    this.breadCrumbItems = [{ label: 'Semestres' }, { label: 'Añadir Semestre', active: true }]; 
  }

  validate(): boolean {
    if (this.name == '') {
      return false;
    }
    return true
  }

  successmsg() {
    var body = { name: '' };
    body['name'] = this.name;
    /*
    this.button_state = true;
    this.loading = true;
    this.semesterService.saveSemester(body).subscribe({
      error: (err) => { 
        this.loading = false;
        this.button_state = false;
      }, 
      next: (rest) => {
        Swal.fire({
          title: 'Semestre Registrado',
          text: 'El semestre ha sido registrado exitosamente',
          icon: 'success',
          confirmButtonColor: '#EF360E',
        });
        this.loading = false;
        this.button_sate = false;
      }
    });*/
  }

}
