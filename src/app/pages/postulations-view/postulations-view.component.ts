import { Component, OnInit } from '@angular/core';
import { PostulationService } from 'src/app/core/services/postulation.service';

@Component({
  selector: 'app-postulations-view',
  templateUrl: './postulations-view.component.html',
  styleUrls: ['./postulations-view.component.scss']
})
export class PostulationsViewComponent implements OnInit {

  postulations: any;
  breadCrumbItems: Array<{}>;

  loading: boolean = false;

  constructor(private postulationService: PostulationService) { }

  ngOnInit(): void {
    this.breadCrumbItems = [{ label: 'Postulaciones' }, { label: 'Visualizar Mis Postulaciones', active: true }];
    let user = JSON.parse(localStorage.getItem('currentUser')!).user.information;
    this.loading = true;
    this.postulationService.getMyPostulations(user.code).subscribe({
      error: (err) => this.loading = false, 
      next: (rest) => {
        this.postulations = rest.data;
        console.log(this.postulations);
        this.loading = false
      }
    });
  }

}
