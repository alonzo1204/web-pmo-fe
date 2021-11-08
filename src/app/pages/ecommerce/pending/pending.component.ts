import { Component, OnInit } from '@angular/core';

import { Pending } from './pending.model';

import { Data1 } from './data1';

@Component({
  selector: 'app-detalles',
  templateUrl: './pending.component.html',
  styleUrls: ['./pending.component.scss']
})
export class PendingComponent implements OnInit {

  // breadcrumb items
  breadCrumbItems: Array<{}>;

  Data1: Pending[];

  constructor() { }

  ngOnInit(): void {
    this.breadCrumbItems = [{ label: 'Ecommerce' }, { label: 'Pending', active: true }];
  
    this._fetchData1();
  }

  private _fetchData1() {
    this.Data1 = Data1;
  }
}
