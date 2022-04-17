import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/core/services/user.service';

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

  constructor(private route: ActivatedRoute, private userService: UserService) { }

  ngOnInit(): void {
    this.breadCrumbItems = [{ label: 'Usuarios' }, { label: 'Lista de Usuarios' }, { label: 'Detalles', active: true }];
    var code = this.route.snapshot.params.code;
    this.userService.getUsersData().subscribe({
      error: (err) => console.log(err), 
      next: (rest) => { 
        this.users = rest.data;
        this.user = this.users.filter(function(data){ return data.code == code })[0];
        this.isLoaded = true;
      }
    });
  }

}