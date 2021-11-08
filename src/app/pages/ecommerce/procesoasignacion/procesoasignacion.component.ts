import { Component, OnInit } from '@angular/core';

import { Cart } from './procesoasignacion.model';

import { cartData } from './data';


@Component({
  selector: 'app-procesoasignacion',
  templateUrl: './procesoasignacion.component.html',
  styleUrls: ['./procesoasignacion.component.scss']
})
export class ProcesoasignacionComponent implements OnInit {

  // breadcrumb items
  breadCrumbItems: Array<{}>;

  cartData: Cart[];

  constructor() { }

  ngOnInit(): void {
    this.breadCrumbItems = [{ label: 'Ecommerce' }, { label: 'Proceso de Asignacion', active: true }];
    
    this._fetchData();
  }

  private _fetchData() {
    this.cartData = cartData;
  }
}
