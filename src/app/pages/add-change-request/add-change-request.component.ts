import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GroupService } from 'src/app/core/services/group.service';
import { ProjectService } from 'src/app/core/services/project.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-change-request',
  templateUrl: './add-change-request.component.html',
  styleUrls: ['./add-change-request.component.scss']
})
export class AddChangeRequestComponent implements OnInit {

  user: any;
  group: any;
  project: any;
  value: string = '';
  atribute: string = '';
  isLoaded: boolean = false;
  loading: boolean = false;
  button_state: boolean = false;
  breadCrumbItems: Array<{}>;
  
  constructor(private router: Router, private projectService: ProjectService, private groupService: GroupService) { }

  ngOnInit(): void {
    this.breadCrumbItems = [{ label: 'Solicitud de Cambio' }, { label: 'Añadir Solicitud de Cambio', active: true }];
    this.user = JSON.parse(localStorage.getItem('currentUser')!).user.information;
    this.groupService.getMyGroup(this.user.code).subscribe({
      error: (err) => this.loading = false, 
      next: (rest) => {
        this.group = rest.data[0];
        this.searchProjectData(this.group.project_assigned.id);
      }
    })
  }

  searchProjectData(project: any) {
    this.projectService.getProjectsData().subscribe({
      next: (rest) => { 
        let projects = rest.data;
        this.project = projects.filter(function(data){ return data.id == project })[0];
        if (this.project == undefined) this.isLoaded = false;
        else this.isLoaded = true;
        //console.log(this.project);
      }
    });
  }

  validate(): boolean {
    if (this.atribute == '' || this.value == '') {
      return false;
    }
    return true
  }

  successmsg() {
    if(this.validate()) {
      var body = { project_id: '', column: 0, value: '' };
      body['project_id'] = this.project.id;
      body['column'] = 1;
      body['value'] = this.value;

      this.button_state = true;
      this.loading = true;
      this.projectService.saveRequestEdits(body).subscribe({
        error: (err) => {
          //console.log(err),
          this.button_state = false;
          this.loading = false;
          Swal.fire({
            title: 'Solicitud no pudo Registrarse',
            text: err,
            icon: 'error',
            confirmButtonColor: '#E42322',
          });
        },
        next: (rest) => {
          Swal.fire({
            title: 'Solicitud Registrada',
            text: 'La solicitud ha sido registrado exitosamente',
            icon: 'success',
            confirmButtonColor: '#EF360E',
            onClose: () => {
              this.router.navigate(['/change-request-list']);
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
    this.atribute = ''; this.value = '';
  }

}
