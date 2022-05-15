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
    //var project_id = group.project_assigned;
    this.projectService.getProjectsData().subscribe({
      next: (rest) => { 
        let projects = rest.data;
        this.project = projects.filter(function(data){ return data.id == project })[0];
        //console.log(this.project);
      }
    });
  }

  successmsg() {
    var body = { user_id: '', project_id: '', attribue_to_change: '', value: '' };
    body['user_id'] = this.user.id;
    body['project_id'] = this.project.id;
    body['attribue_to_change'] = this.atribute;
    body['value'] = this.value;

    this.button_state = true;
    this.loading = true;
    this.projectService.saveRequestEdits(body).subscribe({
      error: (err) => {
        console.log(err),
        this.button_state = false;
        this.loading = false;
        Swal.fire({
          title: 'Solicitud no pudo Registrarse',
          text: 'Verifique llenar los campos correctamente',
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
    console.log(body);
  }

  cleanprocess() {
    this.loading = false;
    this.button_state = false;
    this.atribute = ''; this.value = '';
  }

}
