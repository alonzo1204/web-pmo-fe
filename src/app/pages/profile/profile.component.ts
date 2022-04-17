import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  user: any;
  isLoaded: Boolean = false;
  breadCrumbItems: Array<{}>;

  constructor(private route: ActivatedRoute, private userService: UserService) { }

  ngOnInit(): void {
    this.breadCrumbItems = [{ label: 'Perfil' }, { label: 'Datos Personales', active: true }];
    this.user = JSON.parse(localStorage.getItem("currentUser")!).user.information;
    if (this.user != undefined) this.isLoaded = true;
  }

}
