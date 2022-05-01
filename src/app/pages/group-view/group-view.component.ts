import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GroupService } from 'src/app/core/services/group.service';
import { ProjectService } from 'src/app/core/services/project.service';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-group-view',
  templateUrl: './group-view.component.html',
  styleUrls: ['./group-view.component.scss']
})
export class GroupViewComponent implements OnInit {

  user: any;
  group: any;
  project: any;
  partner: any;

  users: any[] = [];
  groups: any[] = [];
  projects: any[] = [];

  assigned: boolean = true;
  isLoaded: boolean = true;
  breadCrumbItems: Array<{}>;

  loading: boolean = false;

  constructor(private router: Router, private userService: UserService, 
    private projectService: ProjectService, private groupService: GroupService) { }

  ngOnInit(): void {
    this.breadCrumbItems = [{ label: 'Grupos' }, { label: 'Visualizar Mi Grupo', active: true }];
    this.user = JSON.parse(localStorage.getItem('currentUser')!).user.information;
    this.searchPartnerData(this.group);
    this.searchProjectData(this.group);
    this.loading = true;
    this.groupService.getMyGroup({ code: 'u201613458'}).subscribe({
      error: (err) => this.loading = false, 
      next: (rest) => this.loading = false
    })
    /*this.groupService.getGroupsData().subscribe({  
      error: (err) => console.log(err), 
      next: (rest) => { 
        this.groups = rest.data;
        this.group = this.group.filter(function(data){ return data.student_1_id == this.user.id || data.student_2_id == this.user.id })[0];
        this.searchPartnerData(this.group);
        if (this.group) this.isLoaded = true; 
      }
    });*/
  }

  searchPartnerData(group: any) {
    //var partner_id = (this.user.id == group.student_1_id ? group.student_1_id : group.student_2_id);
    this.userService.getUsersData().subscribe({
      error: (err) => console.log(err), 
      next: (rest) => { 
        this.users = rest.data;
        this.partner = this.users.filter(function(data){ return data.id == '3' })[0];
        //console.log(this.partner);
      }
    });
  }

  searchProjectData(group: any) {
    //var project_id = group.project_assigned;
    this.projectService.getProjectsData().subscribe({
      next: (rest) => { 
        this.projects = rest.data;
        this.project = this.projects.filter(function(data){ return data.id == '3' })[0];
        //console.log(this.project);
      }
    });
  }

  groupregister() {
    this.router.navigate(['/group-register']);
  }

  gotodetails(code: string) {
    this.router.navigate(['/project-details-portfolio/'+code]);
  }

}
