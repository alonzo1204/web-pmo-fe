import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PostulationService } from 'src/app/core/services/postulation.service';
import { ProjectService } from 'src/app/core/services/project.service';

@Component({
  selector: 'app-postulations-view',
  templateUrl: './postulations-view.component.html',
  styleUrls: ['./postulations-view.component.scss']
})
export class PostulationsViewComponent implements OnInit {

  type_error: boolean;
  mypostulations: any;
  projects: any[] = [];
  loading: boolean = false;
  isLoaded: boolean = false;
  breadCrumbItems: Array<{}>;

  constructor(private router: Router, private postulationService: PostulationService, 
    private projectService: ProjectService) { }

  ngOnInit(): void {
    this.breadCrumbItems = [{ label: 'Postulaciones' }, { label: 'Visualizar Mis Postulaciones', active: true }];
    let user = JSON.parse(localStorage.getItem('currentUser')!).user.information;
    this.loading = true;
    this.type_error = false;
    this.postulationService.getMyPostulations(user.code).subscribe({
      error: (err) => {
        this.loading = false,
        this.isLoaded = false
      }, 
      next: (rest) => {
        this.mypostulations = rest.data[0];
        console.log('postulations', this.mypostulations)
        this.searchProjectData(this.mypostulations.project_1_id);
        this.searchProjectData(this.mypostulations.project_2_id);
        this.searchProjectData(this.mypostulations.project_3_id);
        this.searchProjectData(this.mypostulations.project_4_id);
        if (this.mypostulations) this.isLoaded = true; else this.isLoaded = false;
        this.type_error = true;
        this.loading = false;
      }
    })
  }

  searchProjectData(project: any) {
    //var project_id = group.project_assigned;
    this.projectService.getProjectsData().subscribe({
      next: (rest) => { 
        let projects = rest.data;
        this.projects.push(projects.filter(function(data){ return data.id == project })[0]);
      }
    });
  }

  groupregister() {
    this.router.navigate(['/group-register']);
  }

  postulationregister() {
    this.router.navigate(['/project-portfolio']);
  }

  gotodetails(code: string) {
    this.router.navigate(['/project-details-portfolio/' + code]);
  }

}
