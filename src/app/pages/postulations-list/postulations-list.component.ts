import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PostulationService } from 'src/app/core/services/postulation.service';

@Component({
  selector: 'app-postulations-list',
  templateUrl: './postulations-list.component.html',
  styleUrls: ['./postulations-list.component.scss']
})
export class PostulationsListComponent implements OnInit {
  page = 1;
  number_postulations: number = 0;
  pageSize = 10;
  loading: boolean = false;
  breadCrumbItems: Array<{}>;
  
  postulations: any[] = [];
  myPostulations: any[] = [];
  
  constructor(private router: Router, private postulationService: PostulationService) { }

  ngOnInit(): void {
    this.breadCrumbItems = [{ label: 'Postulaciones' }, { label: 'Lista de Postulaciones', active: true }];
    this.postulations = this.getPostulationData();
    this.number_postulations = this.postulations.length;
    this.loading = true;
    this.postulationService.getMyPostulations('u201613458').subscribe({
      error: (err) => this.loading = false, 
      next: (rest) => {
        this.myPostulations = rest.data;
        this.loading = false;
      }
    });
  }

  getPostulationData() {
    return JSON.parse(localStorage.getItem('postulations')!);
  }

  gotodetails(code) {
    this.router.navigate(['/postulations-details/'+code]);
  }
}
