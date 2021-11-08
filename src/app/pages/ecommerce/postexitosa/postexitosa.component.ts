import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-postexitosa',
  templateUrl: './postexitosa.component.html',
  styleUrls: ['./postexitosa.component.scss']
})
export class PostexitosaComponent implements OnInit {

  // breadcrumb items
  breadCrumbItems: Array<{}>;

  constructor() { }

  ngOnInit(): void {
    this.breadCrumbItems = [{ label: 'Ecommerce' }, { label: 'Detalles', active: true }];
  }
}
