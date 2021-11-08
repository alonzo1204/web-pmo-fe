import { Component, OnInit } from '@angular/core';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-asignacionpo',
  templateUrl: './asignacionpo.component.html',
  styleUrls: ['./asignacionpo.component.scss']
})
/**
 * Ecommerce Cart component
 */
export class AsignacionpoComponent implements OnInit {

  // breadcrumb items
  breadCrumbItems: Array<{}>;


  detalles: string = "";

  constructor() { }

  ngOnInit(): void {
    this.breadCrumbItems = [{ label: 'Ecommerce' }, { label: 'Cart', active: true }];
    /**
     * fetch data
     */
  }

  
  successmsg() {
    console.log(this.detalles);
    Swal.fire({
      title: 'Asignación confirmada',
      text: 'La asignación ha sido confirmada',
      icon: 'success',
      confirmButtonColor: '#EF360E',
    });
  }

}
