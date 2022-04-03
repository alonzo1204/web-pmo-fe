import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  user: any;
  users: any[] = [];
  isLoaded: Boolean = false;
  breadCrumbItems: Array<{}>;

  constructor(private route: ActivatedRoute, private http: HttpClient) { }

  ngOnInit(): void {
    this.breadCrumbItems = [{ label: 'Perfil' }, { label: 'Datos Personales', active: true }];
    //var code = this.route.snapshot.params.code;
    var code = 'u201213280';
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
