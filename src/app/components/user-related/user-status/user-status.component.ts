import {Component, Inject, Input, OnInit} from '@angular/core';
import {UserService} from "../../../services/user.service";
import {Router} from "@angular/router";
import {DOCUMENT} from "@angular/common";

@Component({
  selector: 'app-user-status',
  templateUrl: './user-status.component.html',
  styleUrls: ['./user-status.component.css']
})
export class UserStatusComponent implements OnInit {

  @Input() isLoggedIn: boolean;

  constructor(@Inject(DOCUMENT) private _document: Document,
              private userService: UserService, private router: Router) { }

  ngOnInit(): void {
  }

  logoutUser() {

    this.userService.logout().subscribe(

      data => {
        this.router.navigate(['/login']);
      }, error => {
        console.log(error);
      }
    );

    this.refreshPageToLogin()

  }

  refreshPageToLogin() {
    this.router.navigateByUrl('/login', {skipLocationChange: false}).then(() =>
      this._document.defaultView.location.reload());
  }

}
