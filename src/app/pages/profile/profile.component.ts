import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  user: any;
  isLoaded: Boolean = false;
  breadCrumbItems: Array<{}>;
  roles: string = '';

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.breadCrumbItems = [{ label: 'Perfil' }, { label: 'Datos Personales', active: true }];
    this.user = JSON.parse(localStorage.getItem("currentUser")!).user.information;
    if (this.user != undefined) this.isLoaded = true;
    let localUser = JSON.parse(localStorage.getItem('currentUser')).user;
    localUser.roles.map((r) => { this.roles = this.roles + r.name.toUpperCase() + ' ' })
  }

  isStudent(): boolean {    
    if (this.roles.includes('DOCENTE') || this.roles.includes('COMITE') || this.roles.includes('COMITÉ')) {
      return false;
    }
    return true;
  }
}
