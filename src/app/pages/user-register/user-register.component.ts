import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.scss']
})
export class UserRegisterComponent implements OnInit {

  name: string = "";
  code: string = "";
  sede: string = "M";
  type: string = "alumno";
  studies: number = 3;
  teachertype: string = "PM";
  score: number;
  breadCrumbItems: Array<{}>;

  constructor(private router: Router, private http: HttpClient) { }

  ngOnInit(): void {
    this.breadCrumbItems = [{ label: 'Usuarios' }, { label: 'Añadir Usuario', active: true }];
  }

  successmsg() {
    var body = {"code":"","firstname":"","lastname":"","role_id":1,"career_id": 1};
    body["code"] = this.code;
    for (var i = 0; i < this.name.split(" ").length-2; i++) {
      body["firstname"] += this.name.split(" ")[i];
      body["firstname"] += " ";
    }
    body["lastname"] = this.name.split(" ")[this.name.split(" ").length-2] + " " + this.name.split(" ")[this.name.split(" ").length-1];
    if (this.type == "alumno") { body["role_id"] = 1; } 
    else if (this.type == "docente") { body["role_id"] = 4; } 
    else if (this.type == "mcomite") { body["role_id"] = 5; }
    body["career_id"] = this.studies;
    this.postUser(body).subscribe(result => {
      console.log(result);
    });;
    Swal.fire({
      title: 'Usuario Registrado',
      text: 'Se ha enviado las instrucciones al usuario generado',
      icon: 'success',
      confirmButtonColor: '#EF360E',
    });
  }

  postUser(body) {
    return this.http.post('localhost:3000/api/v1.0/users/save', body);
  }

  buckupload() {
    this.router.navigate(['/bulk-upload-users']);
  }

}
