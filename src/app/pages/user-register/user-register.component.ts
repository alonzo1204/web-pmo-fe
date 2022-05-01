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

  name: string = '';
  code: string = '';
  sede: string = 'M';
  score: number = 0;
  studies: number = 3;
  type: string = 'alumno';
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

  successmsg() {
    var body = { code: '', firstname: '', lastname: '', role_id: 0, career_id: 0 };
    body['code'] = this.code;
    for (var i = 0; i < this.name.split(" ").length-2; i++) {
      body['firstname'] += this.name.split(" ")[i];
      body['firstname'] += " ";
    }
    body['lastname'] = this.name.split(" ")[this.name.split(" ").length-2] + " " + this.name.split(" ")[this.name.split(" ").length-1];
    if (this.type == "alumno") { body['role_id'] = 1; } 
    else if (this.type == "docente") { body['role_id'] = 4; } 
    else if (this.type == "mcomite") { body['role_id'] = 5; }
    body['career_id'] = this.studies;
    /*
    this.button_state = true;
    this.loading = true;
    this.userService.saveUser(body).subscribe({
      error: (err) => {
        console.log(err),
        this.button_state = false;
        this.loading = false;
        Swal.fire({
          title: 'Usuario no pudo Registrarse',
          text: 'Verifique llenar los campos correctamente',
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
    })*/
  }

  buckupload() {
    this.router.navigate(['/bulk-upload-users']);
  }

}
