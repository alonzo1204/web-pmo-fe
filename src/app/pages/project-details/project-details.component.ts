import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.scss']
})
export class ProjectDetailsComponent implements OnInit {

  project: any;
  isLoaded: Boolean = false;
  constructor() { }

  ngOnInit(): void {
    this.project = history.state.data;
    this.isLoaded = true;
  }

}
