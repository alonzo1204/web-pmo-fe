import { Component, OnInit } from '@angular/core';
import { Accepted } from './accepted.model';

import { Data1 } from './data1';

@Component({
  selector: 'app-detalles',
  templateUrl: './accepted.component.html',
  styleUrls: ['./accepted.component.scss']
})
export class AcceptedComponent implements OnInit {

  // breadcrumb items
  breadCrumbItems: Array<{}>;

  Data1: Accepted[];

  constructor() { }

  ngOnInit(): void {
    this.breadCrumbItems = [{ label: 'Ecommerce' }, { label: 'Accepted', active: true }];

    this._fetchData1();
  }

  private _fetchData1() {
    this.Data1 = Data1;
  }
}
