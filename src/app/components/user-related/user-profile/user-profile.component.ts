import { Component, OnInit } from '@angular/core';
import {UserService} from '../../../services/user.service';
import {User} from '../../../model/user';
@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
    user: User = new User();

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.fetchActiveUser();
  }
  /**
   * The fetchActiveUser() retrieves the active user
   * from the session.
   */
  fetchActiveUser() {

      this.userService.getActiveUser().subscribe(

        data => {

          // store the active user
          this.user = data;

        }, error => {

          console.log(error);

        }
      );
  }
}
