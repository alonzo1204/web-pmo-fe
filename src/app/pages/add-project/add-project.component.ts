import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { CompanyService } from 'src/app/core/services/company.service';
import { CareerService } from 'src/app/core/services/career.service';
import { ProjectService } from 'src/app/core/services/project.service';

@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.scss']
})
export class AddProjectComponent implements OnInit {

  name: string = '';
  studies: number = 3;
  studies_two: number = 3;
  active: boolean = false;
  objective: string = '';
  objective_specific_one: string = '';
  objective_specific_two: string = '';
  objective_specific_three: string = '';
  objective_specific_four: string = '';
  pswitch: boolean = true;
  petition: string = "";
  requeriment: boolean = true;
  company: number = 0;
  description: string = '';

  button_state: boolean = false;

  careers: any[] = [];
  companies: any[] = [];
  breadCrumbItems: Array<{}>;
  loading: boolean = false;

  constructor(private router: Router, private companyService: CompanyService,
    private careerService: CareerService, private projectService: ProjectService) { }

  ngOnInit(): void {
    this.breadCrumbItems = [{ label: 'Revisión de Proyectos' }, { label: 'Añadir Proyecto', active: true }];
    this.companyService.getCompaniesData().subscribe({ error: (err) => console.log(err), next: (rest) => this.companies = rest.data });
    this.careerService.getCareersData().subscribe({ error: (err) => console.log(err), next: (rest) => this.careers = rest.data });
  }

  validate(): boolean {
    if (this.name == '' || this.description == '' || this.objective == '' || this.objective_specific_one == '' || this.objective_specific_two ||
    this.objective_specific_three || this.objective_specific_four) {
      return false;
    }
    return true
  }

  successmsg() {
    if(!this.validate()) {
      var body = {
        code: '', name: '', description: '', general_objective: '', specific_objective_1: '', specific_objective_2: '', specific_objective_3: '',
        specific_objective_4: '', paper: '', devices: '', career_id: '', project_process_state_id: '', company: ''
      };
      body['code'] = 'PRY' + this.makeid(8);
      body['name'] = this.name;
      body['description'] = this.description;
      body['general_objective'] = this.objective;
      body['specific_objetive_1'] = this.objective_specific_one;
      body['specific_objetive_2'] = this.objective_specific_two;
      body['specific_objetive_3'] = this.objective_specific_three;
      body['specific_objetive_4'] = this.objective_specific_four;
      if (this.pswitch) { body['paper'] = '1'; } else { body['paper'] = '0'; };
      if (this.requeriment) { body['devices'] = '1'; } else { body['devices'] = '0'; };
      //if (this.active) { body['other_career_id'] = this.studies_two; } else { body['other_career_id'] = 0; };
      body['career_id'] = this.studies.toString();
      body['project_process_state_id'] = '1';
      body['company'] = this.company.toString();
  
      this.button_state = true;
      this.loading = true;
      this.projectService.saveProject(body).subscribe({
        error: (err) => {
          console.log(err),
          this.button_state = false;
          this.loading = false;
          Swal.fire({
            title: 'Proyecto no pudo Registrarse',
            text: err,
            icon: 'error',
            confirmButtonColor: '#E42322',
          });
        },
        next: (rest) => {
          Swal.fire({
            title: 'Proyecto Registrado',
            text: 'El proyecto ha sido registrado exitosamente',
            icon: 'success',
            confirmButtonColor: '#EF360E',
            onClose: () => {
              this.router.navigate(['/project-review']);
            }
          });
        },
        complete: () => this.cleanprocess()
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
    this.studies = 3; this.studies_two = 3; this.company = 0;
    this.active = false; this.pswitch = true; this.requeriment = true;
    this.name = ''; this.petition = ''; this.description = ''; this.objective = '';
  }

  makeid(length) {
    var result = '';
    var characters = '0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  buckupload() {
    this.router.navigate(['/bulk-upload-projects']);
  }

}
