import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GroupService } from 'src/app/core/services/group.service';
import { ProjectService } from 'src/app/core/services/project.service';

@Component({
  selector: 'app-group-detail',
  templateUrl: './group-detail.component.html',
  styleUrls: ['./group-detail.component.scss']
})
export class GroupDetailComponent implements OnInit {

  myGroup: any;
  project: any;
  groups: any[] = [];
  assigned: boolean = false;
  loading: boolean = false;
  isLoaded: boolean = false;
  breadCrumbItems: Array<{}>;

  constructor(private route: ActivatedRoute, private router: Router, private groupService: GroupService, private projectService: ProjectService) { }

  ngOnInit(): void {
    this.breadCrumbItems = [{ label: 'Grupos' }, { label: 'Lista de Grupos'}, { label: 'Detalle', active: true }];
    var code = this.route.snapshot.params.code;
    this.loading = true;
    this.groupService.getGroupsData().subscribe({
      error: (err) => this.loading = false,
      next: (rest) => {
        this.groups = rest.data;
        this.myGroup = this.groups.filter(function (data) { return data.student_1.Codigo == code })[0];
        this.searchProjectData(this.myGroup.project.nombre);
        this.loading = false;
      }
    })
  }

  searchProjectData(project: any) {
    this.projectService.getProjectsData().subscribe({
      next: (rest) => { 
        let projects = rest.data;
        this.project = projects.filter(function(data){ return data.name == project })[0];
        if(this.project == undefined) this.assigned = false;
        else this.assigned = true;
      }
    });
  }

  gotodetails(code: string) {
    if(code != null) this.router.navigate(['/project-details-portfolio/' + code]);
    else return;
  }

}
