import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import Swal from 'sweetalert2';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { CareerService } from 'src/app/core/services/career.service';
import { UserService } from 'src/app/core/services/user.service';
import { GroupService } from 'src/app/core/services/group.service';

@Component({
  selector: 'app-group-register',
  templateUrl: './group-register.component.html',
  styleUrls: ['./group-register.component.scss']
})
export class GroupRegisterComponent implements OnInit {

  user: any;
  name: string = '';
  sede: string = 'V';
  career: number = 3;

  partner: any;
  partner_name: string = '';
  partner_sede: string = 'M';
  partner_career: number = 1;

  codes: any = [];
  users: any[] = [];
  careers: any[] = [];
  partner_data: any = [];
  active: boolean = false;
  breadCrumbItems: Array<{}>;

  constructor(private router: Router, private careerService: CareerService, 
    private userService: UserService, private groupService: GroupService) { }

  ngOnInit(): void {
    this.breadCrumbItems = [{ label: 'Grupos' }, { label: 'Añadir Grupo', active: true }];
    this.user = JSON.parse(localStorage.getItem('currentUser')!).user.information;
    this.name = this.user.firstname+" "+this.user.lastname;
    this.careerService.getCareersData().subscribe({ error: (err) => console.log(err), next: (rest) => this.careers = rest.data });
    this.userService.getUsersData().subscribe({ 
      error: (err) => console.log(err), 
      next: (rest) => {
        var count = 0; this.users = rest.data;
        while(count < this.users.length) { this.users[count].code != this.user.code ? this.codes.push(this.users[count].code) : ''; count++; }
      } 
    });
  }

  successmsg() {
    var body = { student_1_id: 0, student_2_id: 0, group_weighted_average: 0 }
    body['student_1_id'] = this.user.id;
    body['student_2_id'] = this.partner_data.id;
    body['group_weighted_average'] = 15.8;
    /*
    this.groupService.saveGroup(body).subscribe({
      error: (err) => console.log(err),
      next: (rest) => {
        Swal.fire({
          title: 'Grupo Registrado',
          text: 'El grupo ha sido registrado exitosamente',
          icon: 'success',
          confirmButtonColor: '#EF360E',
        });
      }
    });*/
  }

  getPartnerData(code: any) {
    if(code.length == 10){
      this.partner_data = this.users.filter(function(data){ return data.code == code })[0];
      this.partner_data != undefined ? this.partner_name = this.partner_data.firstname+" "+this.partner_data.lastname : this.partner_name = '';
    }
    code.length < 10 ? this.active = false : this.active = true;
  }

  searchPartner = (text$: Observable<string>) => text$
    .debounceTime(200)
    .distinctUntilChanged()
    .map(term => term.length < 3 ? [] : this.codes.filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10));
  
}
