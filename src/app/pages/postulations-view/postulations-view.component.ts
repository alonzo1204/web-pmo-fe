import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-postulations-view',
  templateUrl: './postulations-view.component.html',
  styleUrls: ['./postulations-view.component.scss']
})
export class PostulationsViewComponent implements OnInit {

  breadCrumbItems: Array<{}>;

  constructor() { }

  ngOnInit(): void {
    this.breadCrumbItems = [{ label: 'Postulaciones' }, { label: 'Visualizar Mis Postulaciones', active: true }];
  }

}
