import {Component, Inject, OnInit} from '@angular/core';
import {DOCUMENT} from '@angular/common';
import {Router} from "@angular/router";
import {UserService} from "../../../services/user.service";
import {User} from "../../../model/user";

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  // to display active (signed in) user information, dynamically
  isLoggedIn: boolean = false;
  activeUser: User = new User();

  constructor(@Inject(DOCUMENT) private _document: Document, private router: Router,
              private userService: UserService) {
  }

  ngOnInit(): void {

    this.getActiveStatus();

    this.fetchActiveUser();

  }

  /**
   * The getActiveStatus() checks to see if a user is signed in.
   */
  getActiveStatus() {

    this.userService.isUserActive().subscribe(

      data => {

        this.isLoggedIn = data;

        // log the data
        console.log("is a user logged in? " + this.isLoggedIn)

      }, error => {

        // log the error
        console.log(error);

      }
    );

  }

  /**
   * The fetchActiveUser() retrieves the active user
   * from the session.
   */
  fetchActiveUser() {

      this.userService.getActiveUser().subscribe(

        data => {

          // store the active user
          this.activeUser = data;

        }, error => {

          console.log(error);

        }
      );

  }

  refreshPage() {
    this.router.navigateByUrl('/', {skipLocationChange: false}).then(() =>
      this._document.defaultView.location.reload());
  }

}
