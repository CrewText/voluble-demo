import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(public authService: AuthService) {

  }
  title = 'CrewText';

  ngOnInit() {

  }

  /**
   * OK SO
   * THE PLAN IS THIS
   * When a user logs in/signs up, they get redirected to /auth/callback.
   * We will implement this page.
   * It will check if the user has a 'voluble_id' in their user_metadata.
   * If not, it will direct them to create a new organization ('/orgs/new'?). Once the org has been created,
   * add the Org to voluble and the user to the org. Then, store their voluble ID in their 'app_metadata'.
   * 
   * If they do have a 'voluble_id', redirect them to the dashboard as normal.
   */

}
