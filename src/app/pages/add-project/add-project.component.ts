import { Component, OnInit } from '@angular/core';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.scss']
})
export class AddProjectComponent implements OnInit {

  name: string = "";
  studies: string = "CC";
  objective: string = "";
  pswitch: boolean = true;
  petition: string = "";
  requeriment: boolean = true;
  company: string = "DC";
  description: string = "";
  breadCrumbItems: Array<{}>;

  constructor() { }

  ngOnInit(): void {
    this.breadCrumbItems = [{ label: 'Proyectos' }, { label: 'Añadir Proyecto', active: true }];
  }

  successmsg() {
    console.log(this.name);
    console.log(this.studies);
    console.log(this.objective);
    console.log(this.pswitch);
    console.log(this.studies);
    console.log(this.petition);
    console.log(this.requeriment);
    console.log(this.company);
    console.log(this.description);
    Swal.fire({
      title: 'Proyecto Registrado',
      text: 'El proyecto ha sido registrado exitosamente',
      icon: 'success',
      confirmButtonColor: '#EF360E',
    });
  }

}
