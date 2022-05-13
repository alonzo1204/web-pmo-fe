import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GroupService } from 'src/app/core/services/group.service';
import { ProjectService } from 'src/app/core/services/project.service';

@Component({
  selector: 'app-group-view',
  templateUrl: './group-view.component.html',
  styleUrls: ['./group-view.component.scss']
})
export class GroupViewComponent implements OnInit {

  group: any;
  project: any;
  assigned: boolean = false;
  isLoaded: boolean = false;
  breadCrumbItems: Array<{}>;

  loading: boolean = false;

  constructor(private router: Router, private projectService: ProjectService, 
    private groupService: GroupService) { }

  ngOnInit(): void {
    this.breadCrumbItems = [{ label: 'Grupos' }, { label: 'Visualizar Mi Grupo', active: true }];
    let user = JSON.parse(localStorage.getItem('currentUser')!).user.information;
    this.loading = true;
    this.groupService.getMyGroup(user.code).subscribe({
      error: (err) => this.loading = false, 
      next: (rest) => {
        this.group = rest.data[0];
        this.searchProjectData(this.group.project_assigned.id);
        if (this.group.project_assigned.id) this.assigned = true; else this.assigned = false; 
        if (this.group) this.isLoaded = true; else this.isLoaded = false;
        this.loading = false
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

  groupregister() {
    this.router.navigate(['/group-register']);
  }

  gotodetails(code: string) {
    this.router.navigate(['/project-details-portfolio/' + code]);
  }

}
