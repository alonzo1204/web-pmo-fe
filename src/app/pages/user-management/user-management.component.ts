import { Component, OnInit } from '@angular/core';
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
  breadCrumbItems: Array<{}>;

  constructor(private semesterService: SemesterService, private userService: UserService) { }

  ngOnInit(): void {
    this.breadCrumbItems = [{ label: 'Usuarios' }, { label: 'Administrar Usuarios', active: true }];
    this.semesterService.getSemestersData().subscribe({ error: (err) => console.log(err), next: (rest) => this.semesters = rest.data });
    this.userService.getUsersData().subscribe({ 
      error: (err) => console.log(err), 
      next: (rest) => {
        this.users = rest.data;
        this.new_users = this.newUserData(this.users);
        this.number_users = this.new_users.length;
        this.filter = this.new_users;
        this.isLoaded = true;
        console.log(this.new_users);
      }
    });
  }

  onAllFilter() {
    this.filter = this.new_users;
    this.number_users = this.filter.length;
  }

  onSemesterFilter(semester: number) {
    this.filter = this.new_users.filter(function(item){return (item.semester == semester);});
    this.number_users = this.filter.length;
  }

  onStatusFilter(status: number) {
    this.filter = this.new_users.filter(function(item){return item.status == status;});
    this.number_users = this.filter.length;
  }

  newUserData(users: any) {
    var count = 0; var newusers = []
    while(count < this.users.length) {
      var body = { code: users[count].code, semester: Math.floor(Math.random() * (this.semesters.length - 1 + 1) + 1), 
        status: Math.floor(Math.random() * (1 - 0 + 1) + 0) };
      newusers.push(body);
      count++;
    }
    return newusers;
  }

  onSearchFilter(keyword: string) {
    this.filter = this.new_users.filter(function(item){ var code = item.code;
      return (code.toLowerCase().includes(keyword.toLowerCase()));
    });
    this.number_users = this.filter.length;
  }

  semesterData(semester: number): string {
    var viewsemester = this.semesters.filter(function(data){ return data.id == semester })[0];
    return viewsemester.name;
  }

}
