import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CareerService } from 'src/app/core/services/career.service';
import { UserService } from 'src/app/core/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit {
  
  user: any;
  roles: string = '';
  users: any[] = [];
  careers: any[] = [];
  isLoaded: boolean = false;
  isActive: boolean = false;
  loading: boolean = false;
  breadCrumbItems: Array<{}>;

  name: string = '';
  email: string = '';
  phone: string = '';
  career: number = 0;
  campus: number = 0;

  button_state: boolean = false;
  name_state: boolean = false;
  email_state: boolean = false;
  career_state: boolean = false;
  campus_state: boolean = false;
  phone_state: boolean = false;

  allCampus = [
    { id: 1, name: 'Monterrico' },
    { id: 2, name: 'San Isidro' },
    { id: 3, name: 'San Miguel' },
    { id: 4, name: 'Villa' }
  ]

  constructor(private route: ActivatedRoute, private userService: UserService, private careerService: CareerService) { }

  ngOnInit(): void {
    this.breadCrumbItems = [{ label: 'Usuarios' }, { label: 'Lista de Usuarios' }, { label: 'Detalles', active: true }];
    this.careerService.getCareersData().subscribe({ error: (err) => console.log(err), next: (rest) => { this.careers = rest.data } });
    var code = this.route.snapshot.params.code;
    this.loading = true;
    this.userService.getUsersData().subscribe({
      error: (err) => this.loading = false,
      next: (rest) => {
        this.users = rest.data;
        this.user = this.users.filter(function (data) { return data.code == code })[0];
        this.name = this.user.firstname + " " + this.user.lastname;
        this.email = this.user.code + '@upc.edu.pe';
        this.career = 3;
        this.campus = 2;
        this.phone = '972734556';
        this.isLoaded = true;
        this.loading = false;
      }
    });
    let localUser = JSON.parse(localStorage.getItem('currentUser')).user;    
    localUser.roles.map((r) => { this.roles = this.roles + r.name + ' ' });
    localUser.roles[0].id == 5 ? this.isActive = true : this.isActive = false;
  }

  editState(item: number) {
    switch(item) {
      case 1: this.name_state == false ? this.name_state = true : this.name_state = false; break;
      case 2: this.email_state == false ? this.email_state = true : this.email_state = false; break;
      case 3: this.career_state == false ? this.career_state = true : this.career_state = false; break;
      case 4: this.campus_state == false ? this.campus_state = true : this.campus_state = false; break;
      default: this.phone_state == false ? this.phone_state = true : this.phone_state = false; 
    }
  }

  editSettings() {
    var body = { 'name': '', 'code': '' ,'career': 0, 'campus': 0, phone: '' };
    body['name'] = this.name;
    let code = this.email.split('@');
    body['code'] = code[0];
    body['career'] = this.career;
    body['campus'] = this.campus;
    body['phone'] = this.phone;
    this.loading = true;
    this.button_state = true;
    this.userService.editUsers(1, body).subscribe({
      error: (err) => {
        console.log(err),
        this.loading = false;
        this.button_state = false;
        Swal.fire({
          title: 'Usuario no pudo Actualizada',
          text: 'Verifique editar bien los campos',
          icon: 'error',
          confirmButtonColor: '#E42322'
        });
      },
      next: (rest) => {
        //this.getSetting();
        Swal.fire({
          title: 'Usuario Actualizada',
          text: 'El usuario ha sido actualizada exitosamente',
          icon: 'success',
          confirmButtonColor: '#EF360E'
        });
      }, 
      complete: () => this.cleanprocess()
    })
  }

  cleanprocess() { 
    this.loading = false;
    this.button_state = false;
    this.name_state = false;
    this.email_state = false;
    this.career_state = false;
    this.campus_state = false;
    this.phone_state = false;
  }

}