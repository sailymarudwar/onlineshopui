import { Component, Inject, OnInit } from '@angular/core';
import { LoginForm } from '../../../model/login-form';
import { UserService } from '../../../services/user.service';
import { User } from '../../../model/user';
import { Router } from '@angular/router';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  credentials: LoginForm = new LoginForm();
  user: User = new User();
  errors: string[];
  hide: boolean = true;

  constructor(@Inject(DOCUMENT) private document: Document, private userService: UserService, private router: Router) {
     this.errors = [];
  }

  ngOnInit(): void {
  }

  onSubmit() {
    this.errors = [];
    this.userService.login(this.credentials).subscribe(
      data => {

        this.user = data;

        localStorage.setItem('loggedIn', 'true');
        localStorage.setItem('email', this.user.email);
        localStorage.setItem('role', this.user.role);

        console.log(data);

        this.refreshPage()

      }, error => {
        console.log(error)
        if (error.status === 409) {
          this.credentials.email = '';
          this.credentials.password = '';
          this.errors.push('User Not Active.Please check activation email');
        } else {
          this.credentials.email = '';
          this.credentials.password = '';
          this.errors.push('Invalid Email or Password');
        }

      }
    );
  }

  refreshPage() {
    this.router.navigateByUrl('/', { skipLocationChange: false }).then(() =>
      this.document.defaultView.location.reload());
  }
}
