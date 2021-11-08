import { Component, OnInit } from '@angular/core';

import { Cart } from './postulacion.model';

import { cartData } from './data';

import Swal from 'sweetalert2';

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

  detalles: string = "";

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

  
  successmsg() {
    console.log(this.detalles);
    Swal.fire({
      title: 'Postulación confirmada',
      text: 'La postulación ha sido confirmada',
      icon: 'success',
      confirmButtonColor: '#EF360E',
    });
  }

}
