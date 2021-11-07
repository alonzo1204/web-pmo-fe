import { Component, OnInit } from '@angular/core';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.scss']
})
export class UserRegisterComponent implements OnInit {

  name: string = "";
  code: string = "";
  type: any = "alumno";
  studies: string = "CC";
  teachertype: string = "PM";

  constructor() { }

  ngOnInit(): void {
  }

  successmsg() {
    console.log(this.name);
    console.log(this.code);
    console.log(this.type);
    console.log(this.studies);
    console.log(this.teachertype);
    Swal.fire({
      title: 'Usuario Registrado',
      text: 'Se ha enviado las instrucciones al usuario generado',
      icon: 'success',
      confirmButtonColor: '#EF360E',
    });
  }

}
