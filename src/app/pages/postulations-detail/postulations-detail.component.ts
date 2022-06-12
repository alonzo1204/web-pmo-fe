import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PostulationService } from 'src/app/core/services/postulation.service';
import { ProjectService } from 'src/app/core/services/project.service';

@Component({
  selector: 'app-postulations-detail',
  templateUrl: './postulations-detail.component.html',
  styleUrls: ['./postulations-detail.component.scss']
})
export class PostulationsDetailComponent implements OnInit {

  records: any;
  mypostulations: any;
  projects: any[] = [];
  pprojects: any[] = [];
  postulations: any[] = [];
  loading: boolean = false;
  isLoaded: boolean = false;
  breadCrumbItems: Array<{}>;

  constructor(private route: ActivatedRoute, private router: Router, private postulationService: PostulationService, 
    private projectService: ProjectService) { }

  ngOnInit(): void {
    this.breadCrumbItems = [{ label: 'Postulaciones' }, { label: 'Lista de Postulaciones'}, { label: 'Detalle', active: true }];
    var code = this.route.snapshot.params.code;
    this.loading = true;
    this.postulationService.getPostulationsData().subscribe({
      error: (err) => this.loading = false,
      next: (rest) => {
        this.postulations = rest.data;
        this.mypostulations = this.postulations.filter(function (data) { return data.id == code })[0];
        this.historyPostulations(this.mypostulations.id);
        this.searchProjectData(this.mypostulations.p1.id);
        this.searchProjectData(this.mypostulations.p2.id);
        this.searchProjectData(this.mypostulations.p4.id);
        this.searchProjectData(this.mypostulations.pa.id);
        this.loading = false;
      }
    })
  }

  historyPostulations(id) {
    let params = { id_postulation_row: id }
    this.projectService.getHistoryProjects(params).subscribe({
      error: (err) => this.loading = false,
      next: (rest) => {
        this.records = rest.data;
        this.searchProjectPData(this.records.project1.id);
        this.searchProjectPData(this.records.project2.id);
        this.searchProjectPData(this.records.project3.id);
        this.searchProjectPData(this.records.project4.id);
        this.isLoaded = true;
        this.loading = false;
        console.log(rest)
      }
    });
  }

  searchProjectPData(project: any) {
    //var project_id = group.project_assigned;
    this.projectService.getProjectsData().subscribe({
      next: (rest) => { 
        let projects = rest.data;
        this.pprojects.push(projects.filter(function(data){ return data.id == project })[0]);
      }
    });
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

  gotodetails(code: string) {
    if(code != null) this.router.navigate(['/project-details-portfolio/' + code]);
    else return;
  }

}
