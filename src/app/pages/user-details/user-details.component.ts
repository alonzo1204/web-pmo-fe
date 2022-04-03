import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit {
  user: any;
  users: any[] = [];
  isLoaded: Boolean = false;
  breadCrumbItems: Array<{}>;

  constructor(private route: ActivatedRoute, private http: HttpClient) { }

  ngOnInit(): void {
    this.breadCrumbItems = [{ label: 'Usuarios' }, { label: 'Lista de Usuarios' }, { label: 'Detalles', active: true }];
    var code = this.route.snapshot.params.code;
    this.getUsersData().subscribe(data => {
      this.users = Object.values(data)[0];
      this.user = this.users.filter(function(data){ return data.code == code })[0];
      this.isLoaded = true;
    });
  }

  getUsersData() {
    return this.http.get("http://localhost:30/api/v1.0/users/");
  }

}