import { Component, OnInit } from '@angular/core';
import { PermissionsService } from 'src/app/core/services/permissions.service';
import { SemesterService } from 'src/app/core/services/semester.service';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.scss']
})
export class UserManagementComponent implements OnInit {

  page = 1;
  pageSize = 15;
  number_users: number;
  keyword: string = "";

  users: any[] = [];
  filter: any[] = [];
  new_users: any[] = [];
  semesters: any[] = [];

  title: string = "Todos";
  isLoaded: boolean = false;
  loading: boolean = false;
  breadCrumbItems: Array<{}>;

  constructor(private semesterService: SemesterService, private userService: UserService, 
    private permissionService: PermissionsService) { }

  ngOnInit(): void {
    this.breadCrumbItems = [{ label: 'Usuarios' }, { label: 'Administrar Usuarios', active: true }];
    this.semesterService.getSemestersData().subscribe({ error: (err) => console.log(err), next: (rest) => this.semesters = rest.data });
    this.loading = true;
    this.permissionService.getPermissionsData().subscribe({ 
      error: (err) => this.loading = false, 
      next: (rest) => {
        this.users = rest.data;
        this.filter = this.users;
        this.number_users = this.new_users.length;
        this.isLoaded = true;
        this.loading = false;
      } 
    });
    // this.userService.getUsersData().subscribe({
    //   error: (err) => this.loading = false,
    //   next: (rest) => {
    //     this.users = rest.data;
    //     this.new_users = this.newUser(this.users);
    //     this.number_users = this.new_users.length;
    //     this.filter = this.new_users;
    //     this.isLoaded = true;
    //     this.loading = false;
    //   }
    // })
  }

  // newUser(users: any) {
  //   let listUsers = [];
  //   for (let user of users) {
  //     let position = Math.floor(Math.random() * (this.semesters.length - 2 + 1) + 1);
  //     var params = { code: user.code, semester: this.semesters[position]?.name, status: Math.floor(Math.random() * (1 - 0 + 1) + 0) }
  //     listUsers.push(params);
  //   }
  //   return listUsers;
  // }

  onAllFilter() {
    this.filter = this.new_users;
    this.number_users = this.filter.length;
  }

  onStatusFilter(status: number) {
    this.filter = this.new_users.filter((item) => {return item.status == status;});
    this.number_users = this.filter.length;
  }

  onSemesterFilter(semester: string) {
    this.filter = this.new_users.filter((item) => {return (item.semester == semester);});
    this.number_users = this.filter.length;
  }

  onSearchFilter(keyword: string) {
    this.filter = this.new_users.filter((item) => {
      var code = item.code;
      return (code.toLowerCase().includes(keyword.toLocaleLowerCase()));
    });
    this.number_users = this.filter.length;
  }

}
