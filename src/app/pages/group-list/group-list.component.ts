import { Component, OnInit } from '@angular/core';
import { GroupService } from 'src/app/core/services/group.service';
import { SemesterService } from 'src/app/core/services/semester.service';

@Component({
  selector: 'app-group-list',
  templateUrl: './group-list.component.html',
  styleUrls: ['./group-list.component.scss']
})
export class GroupListComponent implements OnInit {

  page = 1;
  pageSize = 15;
  number_groups: number;
  keyword: string = "";

  groups: any[] = [];
  filter: any[] = [];
  new_groups: any[] = [];
  semesters: any[] = [];

  title: string = "Todos";
  isLoaded: boolean = false;
  loading: boolean = false;
  breadCrumbItems: Array<{}>;

  constructor(private semesterService: SemesterService, private groupService: GroupService) { }

  ngOnInit(): void {
    this.breadCrumbItems = [{ label: 'Grupos' }, { label: 'Listado de Grupos', active: true }];
    this.semesterService.getSemestersData().subscribe({ error: (err) => console.log(err), next: (rest) => this.semesters = rest.data });
    this.loading = true;
    this.groupService.getGroupsData().subscribe({
      error: (err) => this.loading = false,
      next: (rest) => {
        this.groups = rest.data;
        console.log(this.groups)
        this.new_groups = this.newGroup(this.groups);
        this.number_groups = this.new_groups.length;
        this.filter = this.new_groups;
        this.isLoaded = true;
        this.loading = false;
      }
    })
  }

  newGroup(groups: any) {
    let listGroups = [];
    for (let group of groups) {
      let position = Math.floor(Math.random() * (this.semesters.length - 2 + 1) + 1);
      var params = { student_1: group.student_1?.Codigo, student_2: group.student_2?.Codigo, project: group.project.nombre, semester: this.semesters[position]?.name }
      listGroups.push(params);
    }
    return listGroups;
  }

  onAllFilter() {
    this.filter = this.new_groups;
    this.number_groups = this.filter.length;
  }

  onSemesterFilter(semester: string) {
    this.filter = this.new_groups.filter((item) => {return (item.semester == semester);});
    this.number_groups = this.filter.length;
  }

  onSearchFilter(keyword: string) {
    this.filter = this.new_groups.filter((item) => {
      var code = item.project_assigned.code;
      return (code.toLowerCase().includes(keyword.toLocaleLowerCase()));
    });
    this.number_groups = this.filter.length;
  }

}
