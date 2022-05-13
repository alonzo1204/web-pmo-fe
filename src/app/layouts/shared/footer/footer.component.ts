import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  roles: string = '';

  constructor() { }

  ngOnInit(): void {
    let localUser = JSON.parse(localStorage.getItem('currentUser')).user;
    console.log(localUser);

    localUser.roles.map((r) => { this.roles = this.roles + r.name.toUpperCase() + ' ' })
  }

}
