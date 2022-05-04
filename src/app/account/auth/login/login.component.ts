import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { AuthenticationService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  submitted = false;
  error = '';
  returnUrl: string;

  // set the currenr year
  year: number = new Date().getFullYear();

  // tslint:disable-next-line: max-line-length
  constructor(private formBuilder: FormBuilder, private route: ActivatedRoute, private router: Router, public authService: AuthenticationService) { }

  ngOnInit() {
    document.body.removeAttribute('data-layout');
    document.body.classList.add('auth-body-bg');

    this.loginForm = this.formBuilder.group({
      email: ['pcsiabar@upc.edu.pe', [Validators.required, Validators.email]],
      password: ['12345', [Validators.required]],
    });

    // reset login status
    // this.authenticationService.logout();
    // get return url from route parameters or default to '/'
    // tslint:disable-next-line: no-string-literal
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }

  /**
   * Form submit
   */
  onSubmit() {
    this.submitted = true;
    if (this.loginForm.invalid) return;
    else {
      var email = "";
      if (this.f.email.value[0] == "u" || this.f.email.value[0] == "U") {
        email = (this.f.email.value).substring(0, 10);
      } else {
        email = (this.f.email.value).substring(0, 8);
      }
      this.authService.login(email, this.f.password.value)
        .pipe(first())
        .subscribe(data => {
          //console.log(data);
          this.router.navigate(['/']);
        }, error => { this.error = error ? error : ''; });
    }
  }

}
