import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-change-request',
  templateUrl: './add-change-request.component.html',
  styleUrls: ['./add-change-request.component.scss']
})
export class AddChangeRequestComponent implements OnInit {

  loading: boolean = false;
  breadCrumbItems: Array<{}>;
  
  constructor() { }

  ngOnInit(): void {
    this.breadCrumbItems = [{ label: 'Solicitud de Cambio' }, { label: 'Añadir Solicitud de Cambio', active: true }];
  }

}
