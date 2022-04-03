import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-postulations-list',
  templateUrl: './postulations-list.component.html',
  styleUrls: ['./postulations-list.component.scss']
})
export class PostulationsListComponent implements OnInit {
  page = 1;
  number_postulations: number = 0;
  pageSize = 10;
  breadCrumbItems: Array<{}>;
  
  postulations: any[] = [];
  
  constructor(private router: Router) { }

  ngOnInit(): void {
    this.breadCrumbItems = [{ label: 'Postulaciones' }, { label: 'Lista de Postulaciones', active: true }];
    this.postulations = this.getPostulationData();
    this.number_postulations = this.postulations.length;
  }

  getPostulationData() {
    return JSON.parse(localStorage.getItem('postulations')!);
  }

  gotodetails(code) {
    this.router.navigate(['/postulations-details/'+code]);
  }
}
