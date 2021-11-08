import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-detallesaccepted',
  templateUrl: './detallesaccepted.component.html',
  styleUrls: ['./detallesaccepted.component.scss']
})
export class DetallesacceptedComponent implements OnInit {

  // breadcrumb items
  breadCrumbItems: Array<{}>;

  constructor() { }

  ngOnInit(): void {
    this.breadCrumbItems = [{ label: 'Ecommerce' }, { label: 'Detalles Aceptados', active: true }];
  }
}
