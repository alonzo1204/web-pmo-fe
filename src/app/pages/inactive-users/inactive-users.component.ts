import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-inactive-users',
  templateUrl: './inactive-users.component.html',
  styleUrls: ['./inactive-users.component.scss']
})
export class InactiveUsersComponent implements OnInit {
  inactives: any[] = [
    {"name": "Cesar Ruso Luciando Jora", "code": "U20196789", "state":"inactivo"},
    {"name": "Cesar Ruso Luciando Jora", "code": "U20196789", "state":"inactivo"},
    {"name": "Cesar Ruso Luciando Jora", "code": "U20196789", "state":"inactivo"},
    {"name": "Cesar Ruso Luciando Jora", "code": "U20196789", "state":"inactivo"},
    {"name": "Cesar Ruso Luciando Jora", "code": "U20196789", "state":"inactivo"},
    {"name": "Cesar Ruso Luciando Jora", "code": "U20196789", "state":"inactivo"},
    {"name": "Cesar Ruso Luciando Jora", "code": "U20196789", "state":"inactivo"},
    {"name": "Cesar Ruso Luciando Jora", "code": "U20196789", "state":"inactivo"},
    {"name": "Cesar Ruso Luciando Jora", "code": "U20196789", "state":"inactivo"},
    {"name": "Cesar Ruso Luciando Jora", "code": "U20196789", "state":"inactivo"},
  ];
  constructor() { }

  ngOnInit(): void {
  }

}
