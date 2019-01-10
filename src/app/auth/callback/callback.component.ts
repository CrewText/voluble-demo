import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as Promise from 'bluebird';
import { AuthService } from 'src/app/auth.service';
import { JwtHelperService } from '@auth0/angular-jwt';
//import { NoOrganizationComponent } from '../../no-organization/no-organization.component'

@Component({
  selector: 'app-callback',
  templateUrl: './callback.component.html',
  styleUrls: ['./callback.component.css']
})
export class CallbackComponent implements OnInit {

  public profile: any

  constructor(private router: Router,
    public authService: AuthService,
    private jwtHelper: JwtHelperService) {

    this.authService.accessTokenChangeEventEmitter.subscribe((new_auth_token) => {
      this.onAccessTokenChange(new_auth_token)
    })
    console.log("Constructor called, handling auth")
    authService.handleAuthentication()
    // Promise.mapSeries([authService.handleAuthentication()], () => { return true })
    //   .then(() => {
    //     console.log("Done handling auth")
    //     return
    //   })



  }

  private onAccessTokenChange(new_auth_token) {
    this.authService.accessTokenChangeEventEmitter.unsubscribe()
    this.profile = this.authService.decodeToken(this.authService.id_token)
    if (this.profile["https://crewtext.com/voluble_id"]) { this.router.navigate(['/']) }
  }

  ngOnInit() {

    //this.router.navigate()
    //   this.profileService.getLoggedInUserProfile().subscribe((profile: any) => {
    //     console.log(profile)
    //   })
    // }


  }
}
