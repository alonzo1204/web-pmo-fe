import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.scss']
})
export class UserManagementComponent implements OnInit {
  page = 1;
  number_projects: number = 50;
  pageSize = 15;
  keyword: string = "";
  users: any[] = [];
  semesters: any[] = [];
  fake: any[] = [];
  filter: any[] = [];
  isLoaded: boolean = false;
  title: string = "Todos";
  breadCrumbItems: Array<{}>;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.breadCrumbItems = [{ label: 'Usuarios' }, { label: 'Administrar Usuarios', active: true }];
    this.getSemestersData().subscribe(data => { this.semesters = Object.values(data)[0]; });
    this.getUsersData().subscribe(data => {
      this.users = Object.values(data)[0];
      this.fakeData(this.users);
      this.number_projects = this.fake.length;
      this.filter = this.fake;
      this.isLoaded = true;
    });
  }

  getUsersData() {
    return this.http.get("http://localhost:30/api/v1.0/users/");
  }

  getSemestersData() {
    return this.http.get("http://localhost:30/api/v1.0/semester/");
  }
  
  FiltrarTodos(): void {
    this.filter = this.fake;
    this.number_projects = this.filter.length;
  }

  FiltrarSemestre(semester): void {
    this.filter = this.fake.filter(function(item){return (item.semester == semester);});
    this.number_projects = this.filter.length;
  }

  FiltrarEstado(status): void {
    this.filter = this.fake.filter(function(item){return item.status == status;});
    this.number_projects = this.filter.length;
  }

  semesterData(semester): string {
    var viewsemester = this.semesters.filter(function(data){ return data.id == semester })[0];
    return viewsemester.name;
  }

  statusData(status): string {
    return status == 0 ? 'Bloqueado' : 'Habilitado';
  }

  fakeData(users) {
    var count = 0;
    while (count < users.length) {
      var semester = Math.floor(Math.random() * (7 - 1 + 1) + 1);
      var status = Math.floor(Math.random() * (1 - 0 + 1) + 0);
      var body = { code: users[count].code, semester: semester, status: status };
      this.fake.push(body);
      count++;
    }
  }

  onSearchFilter(keyword: string) {
    this.filter = this.fake.filter(function(item){
      var code = item.code;
      return (code.toLowerCase().includes(keyword.toLowerCase()));
    });
    this.number_projects = this.filter.length;
  }
}
