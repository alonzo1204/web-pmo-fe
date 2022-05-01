import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-postulations-details',
  templateUrl: './postulations-details.component.html',
  styleUrls: ['./postulations-details.component.scss']
})
export class PostulationsDetailsComponent implements OnInit {
  postulation: any;
  isLoaded: Boolean = false;
  loading: boolean = false;
  breadCrumbItems: Array<{}>;

  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.breadCrumbItems = [{ label: 'Postulaciones' }, { label: 'Lista de Postulaciones' }, { label: 'Detalles', active: true }];
    var code = this.route.snapshot.params.code; var postulations = this.getPostulationData();
    this.postulation = postulations.filter(function(data){ return data.code == code })[0];
    if(this.postulation.length != 0) this.isLoaded = true;
    console.log(this.postulation);
  }

  getPostulationData() {
    return JSON.parse(localStorage.getItem('postulations')!);
  }

  gotodetails(code) {
    this.router.navigate(['/project-details-portfolio/'+code]);
  }
}
