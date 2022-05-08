import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '../../../core/services/auth.service';
import { first } from 'rxjs/operators';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit, AfterViewInit {

  signupForm: FormGroup;
  submitted = false;
  error = '';
  successmsg = false;

  button_state: boolean = false;
  loading: boolean = false;

  // set the currenr year
  year: number = new Date().getFullYear();

  // tslint:disable-next-line: max-line-length
  constructor(private formBuilder: FormBuilder, private route: ActivatedRoute, private router: Router, private authenticationService: AuthenticationService) { }

  ngOnInit() {
    document.body.removeAttribute('data-layout');
    document.body.classList.add('auth-body-bg');

    this.signupForm = this.formBuilder.group({
      username: ['', Validators.required],
      // email: ['', [Validators.required, Validators.email]],
      // password: ['', Validators.required],
    });
  }

  ngAfterViewInit() {
  }

  // convenience getter for easy access to form fields
  get f() { return this.signupForm.controls; }

  /**
   * On submit form
   */
  onSubmit() {
    this.submitted = true;
    if (this.signupForm.invalid) return;
    else {
      this.button_state = true;
      this.loading = true;
      this.authenticationService.requestAccess(this.f.username.value)
        .pipe(first())
        .subscribe(data => {
          this.button_state = false;
          this.loading = false;
          Swal.fire({
            title: 'Solicitud Enviada',
            icon: 'success',
            confirmButtonColor: '#EF360E',
          });
          this.router.navigate(['/']);
        }, error => { this.error = error ? error : ''; this.button_state = false; this.loading = false; })
    }
  }
}
