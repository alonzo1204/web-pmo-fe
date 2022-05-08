import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-change-request-list',
  templateUrl: './change-request-list.component.html',
  styleUrls: ['./change-request-list.component.scss']
})
export class ChangeRequestListComponent implements OnInit {

  keyword: string = "";
  loading: boolean = false;
  breadCrumbItems: Array<{}>;

  constructor() { }

  ngOnInit(): void {
    this.breadCrumbItems = [{ label: 'Solicitud de Cambio' }, { label: 'Lista de Solicitudes de Cambio', active: true }];
  }

}
