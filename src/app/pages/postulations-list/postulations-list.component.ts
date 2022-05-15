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
  pageSize = 15;
  number_postulations: number;
  keyword: string = "";
  postulations: any[] = [];
  filter: any[] = [];
  level: number;
  title: string = "Todos";
  isLoaded: boolean = false;
  loading: boolean = false;
  breadCrumbItems: Array<{}>;

  constructor(private router: Router, private postulationService: PostulationService) { }

  ngOnInit(): void {
    this.breadCrumbItems = [{ label: 'Postulaciones' }, { label: 'Lista de Postulaciones', active: true }];
    this.loading = true;
    this.postulationService.getPostulationsData().subscribe({
      error: (err) => this.loading = false,
      next: (rest) => {
        this.postulations = rest.data;
        this.filter = this.postulations;
        console.log(this.postulations)
        this.number_postulations = this.postulations.length;
        this.isLoaded = true;
        this.loading = false;
      }
    });
  }

  onSearchFilter(keyword: string) {
    this.filter = this.postulations.filter(function (item) {
      return (item.student_1.code.toLowerCase().includes(keyword.toLowerCase()) ||
        item.student_2.code.toLowerCase().includes(keyword.toLowerCase()) ||
        item.proj1.code.toLowerCase().includes(keyword.toLowerCase()));
    });
    this.number_postulations = this.filter.length;
  }

  gotodetails(code: string) {
    this.router.navigate(['/postulations-detail/' + code]);
  }

}
