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
  pswitch: boolean = true;
  petition: string = "";
  requeriment: boolean = true;
  company: number = 0;
  description: string = '';

  careers: any[] = [];
  companies: any[] = [];
  breadCrumbItems: Array<{}>;

  constructor(private router: Router, private companyService: CompanyService, 
    private careerService: CareerService, private projectService: ProjectService) { }

  ngOnInit(): void {
    this.breadCrumbItems = [{ label: 'Revisión de Proyectos' }, { label: 'Añadir Proyecto', active: true }];
    this.companyService.getCompaniesData().subscribe({ error: (err) => console.log(err), next: (rest) => this.companies = rest.data });
    this.careerService.getCareersData().subscribe({ error: (err) => console.log(err), next: (rest) => this.careers = rest.data });
  }

  successmsg() {
    var body = { code: '', name: '', description: '', general_objective: '', paper: '', devices: '', career_id: '', project_process_state_id: '', company: '' };
    body['code'] = 'PRY' + this.makeid(8);
    body['name'] = this.name;
    body['description'] = this.description;
    body['general_objective'] = this.objective;
    if (this.pswitch) { body['paper'] = '1'; } else { body['paper'] = '0'; };
    if (this.requeriment) { body['devices'] = '1'; } else { body['devices'] = '1'; };
    //if (this.active) { body['other_career_id'] = this.studies_two; } else { body['other_career_id'] = 0; };
    body['career_id'] = this.studies.toString();
    body['project_process_state_id'] = '1';
    body['company'] = this.company.toString();
    
    this.projectService.saveProject(body).subscribe({
      error: (err) => console.log(err),
      next: (rest) => {
        Swal.fire({
          title: 'Proyecto Registrado',
          text: 'El proyecto ha sido registrado exitosamente',
          icon: 'success',
          confirmButtonColor: '#EF360E',
        });
      }, 
      complete: () => this.cleanprocess()
    });
  }

  cleanprocess() {
    this.studies = 3; this.studies_two = 3; this.company = 0;
    this.active = false; this.pswitch = true; this.requeriment = true;
    this.name = ''; this.petition = ''; this.description = ''; this.objective = '';
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
