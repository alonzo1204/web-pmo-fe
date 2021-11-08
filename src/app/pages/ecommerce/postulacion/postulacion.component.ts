import { Component, OnInit } from '@angular/core';

import { Cart } from './postulacion.model';

import { cartData } from './data';

@Component({
  selector: 'app-postulacion',
  templateUrl: './postulacion.component.html',
  styleUrls: ['./postulacion.component.scss']
})
/**
 * Ecommerce Cart component
 */
export class PostulacionComponent implements OnInit {

  // breadcrumb items
  breadCrumbItems: Array<{}>;

  cartData: Cart[];

  constructor() { }

  ngOnInit(): void {
    this.breadCrumbItems = [{ label: 'Ecommerce' }, { label: 'Cart', active: true }];
    /**
     * fetch data
     */
    this._fetchData();
  }

  /**
   * Cart data fetch
   */
  private _fetchData() {
    this.cartData = cartData;
  }
}
