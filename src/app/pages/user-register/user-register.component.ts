import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CareerService } from 'src/app/core/services/career.service';
import { UserService } from 'src/app/core/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.scss']
})
export class UserRegisterComponent implements OnInit {

  firstname: string = '';
  lastname: string = '';
  password: string = '';
  code: string = '';
  sede: string = 'M';
  score: number = 0;
  studies: number = 3;
  type: string = 'tp1';
  teachertype: string = 'PM';

  button_state: boolean = false;
  loading: boolean = false;

  careers: any[] = [];
  breadCrumbItems: Array<{}>;

  constructor(private router: Router, private careerService: CareerService, private userService: UserService) { }

  ngOnInit(): void {
    this.breadCrumbItems = [{ label: 'Usuarios' }, { label: 'Añadir Usuario', active: true }];
    this.careerService.getCareersData().subscribe({ error: (err) => console.log(err), next: (rest) => this.careers = rest.data });
  }

  validate(): boolean {
    if (this.code == '' || this.firstname == '' || this.lastname == '' || this.password == '') {
      return false;
    }
    return true
  }

  successmsg() {
    if (this.validate()) {
      var body = { code: '', firstname: '', lastname: '', password: '', role_id: 0, career_id: 0, semester_id: 1 };
      body['code'] = this.code;
      body['firstname'] = this.firstname;
      body['lastname'] = this.lastname;
      body['password'] = this.password;
      if (this.type == "tdp") { body['role_id'] = 1; body['isStudent'] = false }
      else if (this.type == "tp1") { body['role_id'] = 2; body['isStudent'] = false }
      else if (this.type == "tp2") { body['role_id'] = 3; body['isStudent'] = false }
      else if (this.type == "docente") { body['role_id'] = 4; body['isStudent'] = false }
      else if (this.type == "mcomite") { body['role_id'] = 5; body['isStudent'] = false }
      body['career_id'] = this.studies;
      this.button_state = true;
      this.loading = true;
      this.userService.saveUser(body).subscribe({
        error: (err) => {
          console.log(err),
            this.button_state = false;
          this.loading = false;
          Swal.fire({
            title: 'Usuario no pudo Registrarse',
            text: err,
            icon: 'error',
            confirmButtonColor: '#E42322',
          });
        },
        next: (rest) => {
          Swal.fire({
            title: 'Usuario Registrado',
            text: 'Se ha enviado las instrucciones al usuario generado',
            icon: 'success',
            confirmButtonColor: '#EF360E',
          });
        },
        complete: () => { this.button_state = false; this.loading = false; }
      })
    } else {
      Swal.fire({
        title: 'Complete el formulario',
        text: 'Todos los campos son obligatorios',
        icon: 'error',
        confirmButtonColor: '#E42322',
      });
    }
  }

  buckupload() {
    this.router.navigate(['/bulk-upload-users']);
  }

}
