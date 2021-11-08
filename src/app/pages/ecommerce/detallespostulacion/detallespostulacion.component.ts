import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-detallespostulacion',
  templateUrl: './detallespostulacion.component.html',
  styleUrls: ['./detallespostulacion.component.scss']
})
export class DetallespostulacionComponent implements OnInit {

  // breadcrumb items
  breadCrumbItems: Array<{}>;

  constructor() { }

  ngOnInit(): void {
    this.breadCrumbItems = [{ label: 'Ecommerce' }, { label: 'Detalles', active: true }];
  }
}
