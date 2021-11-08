import { Component, OnInit } from '@angular/core';

import { Declined } from './declined.model';

import { Data1 } from './data1';

@Component({
  selector: 'app-detalles',
  templateUrl: './declined.component.html',
  styleUrls: ['./declined.component.scss']
})
export class DeclinedComponent implements OnInit {

  // breadcrumb items
  breadCrumbItems: Array<{}>;

  Data1: Declined[];

  constructor() { }

  ngOnInit(): void {
    this.breadCrumbItems = [{ label: 'Ecommerce' }, { label: 'Declined', active: true }];
    
    this._fetchData1();
  }

  private _fetchData1() {
    this.Data1 = Data1;
  }
}
