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
  type: string = "alumno";
  studies: string = "";

  constructor() { }

  ngOnInit(): void {
  }

  successmsg() {
    Swal.fire({
      title: 'Usuario Registrado',
      text: 'Se ha enviado las instrucciones al usuario generado',
      icon: 'success',
      confirmButtonColor: '#008000',
    });
  }

}
