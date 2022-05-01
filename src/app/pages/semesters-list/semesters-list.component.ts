import { Component, OnInit } from '@angular/core';
import { SemesterService } from 'src/app/core/services/semester.service';

@Component({
  selector: 'app-semesters-list',
  templateUrl: './semesters-list.component.html',
  styleUrls: ['./semesters-list.component.scss']
})
export class SemestersListComponent implements OnInit {

  page = 1;
  pageSize = 15;
  number_semesters: number;
  keyword: string = "";
  semesters: any[] = [];
  filter: any[] = [];
  isLoaded: boolean = false;
  loading: boolean = false;
  breadCrumbItems: Array<{}>;

  constructor(private semesterService: SemesterService) { }

  ngOnInit(): void {
    this.breadCrumbItems = [{ label: 'Semestres' }, { label: 'Lista de Semestres', active: true }];
    this.loading = true;
    this.semesterService.getSemestersData().subscribe({
      error: (err) => this.loading = false, 
      next: (rest) => {
        this.semesters = rest.data;
        this.filter = this.semesters;
        this.number_semesters = this.semesters.length;
        this.isLoaded = true;
        this.loading = false;
      }
    });
  }

}
