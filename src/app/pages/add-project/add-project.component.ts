import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.scss']
})
export class AddProjectComponent implements OnInit {

  name: string = "";
  studies: number = 3;
  objective: string = "";
  pswitch: boolean = true;
  petition: string = "";
  requeriment: boolean = true;
  company: number = 1;
  description: string = "";
  breadCrumbItems: Array<{}>;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.breadCrumbItems = [{ label: 'Proyectos' }, { label: 'Añadir Proyecto', active: true }];
  }

  successmsg() {
    var body = {"code": "","name": "","description": "","general_objective": "","paper": 1,"devices": 1,"career_id": 1,"cycle_id": 1,"company": 1,"project_process_state_id": 1};
    body["code"] = "PRY" + this.makeid(8);
    body["name"] = this.name;
    body["description"] = this.description;
    body["general_objective"] = this.objective;
    if (this.pswitch == true) { body["paper"] = 1; } else { body["paper"] = 0; }
    if (this.requeriment == true) { body["devices"] = 1; } else { body["devices"] = 0; }
    body["career_id"] = this.studies;
    body["cycle_id"] = 1;
    body["company"] = this.company;
    body["project_process_state_id"] = 1;
    this.postProject(body).subscribe(result => {
      console.log(result);
    });;
    Swal.fire({
      title: 'Proyecto Registrado',
      text: 'El proyecto ha sido registrado exitosamente',
      icon: 'success',
      confirmButtonColor: '#EF360E',
    });
  }

  postProject(body) {
    return this.http.post('http://localhost:30/api/v1.0/projects/save', body);
  }

  makeid(length) {
    var result = '';
    var characters = '0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

}
