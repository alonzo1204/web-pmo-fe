import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit {
 
  page = 1;
  pageSize = 15;
  number_users: number;
  keyword: string = "";
  users: any[] = [];
  filter: any[] = [];
  level: number;
  title: string = "Todos";
  isLoaded: boolean = false;
  breadCrumbItems: Array<{}>;

  constructor(private router: Router, private userService: UserService) { }

  ngOnInit(): void {
    this.breadCrumbItems = [{ label: 'Usuarios' }, { label: 'Lista de Usuarios', active: true }];
    this.userService.getUsersData().subscribe({
      error: (err) => console.log(err), 
      next: (rest) => { 
        this.users = rest.data;
        this.filter = this.users;
        this.number_users = this.users.length;
        this.isLoaded = true;
      }
    });
  }

  onRoleFilter(id: number) {
    switch(id) {
      case 1: this.filter = this.users.filter(function(item){ return (item.role.name == "tdp" || item.role.name == "tp1" || item.role.name == "tp2"); }); break;
      case 2: this.filter = this.users.filter(function(item){ return item.role.name == "docente"; }); break;
      case 3: this.filter = this.users.filter(function(item){ return item.role.name == "comite"; }); break;
      case 4: this.filter = this.users.filter(function(item){ return item.active == 0; }); break;
      default: this.filter = this.users;
    }
    this.number_users = this.filter.length;
  }

  onSearchFilter(keyword: string) {
    this.filter = this.users.filter(function(item){
      var username = item.firstname + " " + item.lastname;
      return (username.toLowerCase().includes(keyword.toLowerCase()) || 
      item.code.toLowerCase().includes(keyword.toLowerCase()));
    });
    this.number_users = this.filter.length; 
  }

  averageStudent(min: number, max: number): string {
    var average = Math.floor(Math.random() * (max - min + 1) + min);
    return average.toFixed(2);
  }

  englishLevel(min: number, max: number): number {
    this.level = Math.floor(Math.random() * (max - min + 1) + min);
    return this.level;
  }

  englishLabel(level: number): string {
    return level == 5 ? level + '- no apto' : level + ' - apto'
  }

  gotodetails(id: number) {
    this.router.navigate(['/user-details/'+this.users[id-1].code]);
  }

}
