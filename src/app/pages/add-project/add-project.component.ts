import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.scss']
})
export class AddProjectComponent implements OnInit {

  name: string = "";
  careers: any[] = [];
  companies: any[] = [];
  studies: number = 3;
  objective: string = "";
  pswitch: boolean = true;
  petition: string = "";
  requeriment: boolean = true;
  company: number = 0;
  description: string = "";
  breadCrumbItems: Array<{}>;

  active: boolean = false;
  studies_two: number = 3;

  constructor(private router: Router, private http: HttpClient) { }

  ngOnInit(): void {
    this.breadCrumbItems = [{ label: 'Proyectos' }, { label: 'Añadir Proyecto', active: true }];
    this.getCompaniesData().subscribe(data => { this.companies = Object.values(data)[0]; });
    this.getCareersData().subscribe(data => { this.careers = Object.values(data)[0]; });
  }

  successmsg() {
    var body = {"code": "","name": "","description": "","general_objective": "","paper": 1,"devices": 1,"career_id": 1,"career_two_id": 1,"cycle_id": 1,"company": 1,"project_process_state_id": 1};
    body["code"] = "PRY" + this.makeid(8);
    body["name"] = this.name;
    body["description"] = this.description;
    body["general_objective"] = this.objective;
    if (this.pswitch == true) { body["paper"] = 1; } else { body["paper"] = 0; }
    if (this.requeriment == true) { body["devices"] = 1; } else { body["devices"] = 0; }
    //if (this.active == true) { body["other_carrer_id"] = this.otherStudies; } else { body["other_carrer_id"] = 0; }
    body["career_id"] = this.studies;
    body["career_two_id"] = this.studies_two;
    body["cycle_id"] = 1;
    body["company"] = this.company;
    body["project_process_state_id"] = 1;
    console.log(body);
    /*this.postProject(body).subscribe(result => {
      console.log(result);
    });;*/
    Swal.fire({
      title: 'Proyecto Registrado',
      text: 'El proyecto ha sido registrado exitosamente',
      icon: 'success',
      confirmButtonColor: '#EF360E',
    });
  }

  getCompaniesData() {
    return this.http.get("http://localhost:30/api/v1.0/companies");
  }

  getCareersData() {
    return this.http.get("http://localhost:30/api/v1.0/careers");
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

  buckupload() {
    this.router.navigate(['/bulk-upload-projects']);
  }

}
