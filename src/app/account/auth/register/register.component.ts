import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  signupForm: FormGroup;
  submitted = false;
  error = '';
  successmsg = false;

  button_state: boolean = false;
  loading: boolean = false;

  // set the currenr year
  year: number = new Date().getFullYear();

  constructor(private formBuilder: FormBuilder, private authService: AuthenticationService, private router: Router) { }

  ngOnInit(): void {
    document.body.removeAttribute('data-layout');
    document.body.classList.add('auth-body-bg');

    this.signupForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      firstname: ['', Validators.required],
      lastname: ['', Validators.required]
    });
  }

  get f() { return this.signupForm.controls; }

  onSubmit() {
    this.submitted = true;
    if (this.signupForm.invalid) return;
    else {
      var body = { code: '', password: '', firstname: '', lastname: '', role_id: 0, semester_id: 0, career_id: 0 }
      body['code'] = this.f.username.value;
      body['password'] = this.f.password.value;
      body['firstname'] = this.f.firstname.value;
      body['lastname'] = this.f.lastname.value;
      body['role_id'] = 2;
      body['semester_id'] = 1;
      body['career_id'] = 1;
      body['isStudent'] = true;

      this.button_state = true;
      this.loading = true;
      this.authService.register(body)
        .pipe(first())
        .subscribe(data => {
          this.button_state = false;
          this.loading = false;
          Swal.fire({
            title: 'Registrado Exitosamente',
            icon: 'success',
            confirmButtonColor: '#EF360E',
          });
          this.router.navigate(['/account/login']);
        }, error => { this.error = error ? error : ''; this.button_state = false; this.loading = false; })
    }
  }

}
