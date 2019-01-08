import { Injectable, EventEmitter } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import * as auth0 from 'auth0-js';
import * as Promise from 'bluebird';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private jwtHelper: JwtHelperService) { }

  private auth0Auth = new auth0.WebAuth({
    clientID: 'COMAy4nBatqEuGzdTHEzOOc2ucpRywcs',
    domain: 'voluble-dev.eu.auth0.com',
    responseType: 'token id_token',
    redirectUri: 'http://localhost:4200/auth/callback',
    scope: 'openid profile read:current_user create:current_user_metadata update:current_user_metadata delete:current_user_metadata',
    audience: 'https://voluble-poc.herokuapp.com'
  });



  public accessTokenChangeEventEmitter = new EventEmitter(true)

  /**
   * Retrieves the authorization token.
   */
  public get access_token(): string {
    return localStorage.getItem('access_token')
  }


  public set access_token(v: string) {
    localStorage.setItem('access_token', v)
    this.accessTokenChangeEventEmitter.emit(v)
  }


  public get id_token(): string {
    return localStorage.getItem('id_token')
  }

  public set id_token(v: string) {
    localStorage.setItem('id_token', v)
  }

  public login(): void {
    this.auth0Auth.authorize()
  }

  public handleAuthentication() {

    if (this.isAuthenticated()) {
      this.accessTokenChangeEventEmitter.emit(this.access_token)
      return
    }

    //let p: Promise<void>
    this.auth0Auth.parseHash((err, authResult) => {
      console.debug("Handling auth")
      if (authResult && authResult.accessToken && authResult.idToken) {
        window.location.hash = '';
        this.setSession(authResult)
        //p = Promise.try(() => this.setSession(authResult));
      } else if (err) {
        //this.router.navigate(['/home']);
      }
    })

    // return p
  }

  private setSession(authResult): void {
    // Set isLoggedIn flag in localStorage
    console.debug("Setting session")
    localStorage.setItem('isLoggedIn', 'true');
    this.access_token = authResult.accessToken
    this.id_token = authResult.idToken
  }

  public renewSession(): Promise<void> {
    return Promise.fromCallback((cb) => {
      this.auth0Auth.checkSession({}, (err, authResult) => {
        console.log("Renewing session")
        if (authResult && authResult.accessToken && authResult.idToken) {
        } else if (err) {
          //alert(`Could not get a new token (${err.error}: ${err.error_description}).`);
          this.logout();
        }
      });
    })
  }

  public renewSession2(): Promise<void> {
    return Promise.fromCallback((cb) => {
      this.auth0Auth.checkSession({}, cb)
    })
  }

  public logout(): void {
    // Remove tokens and expiry time
    // Remove isLoggedIn flag from localStorage
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('access_token')
    localStorage.removeItem('id_token')
    // Go back to the home route
    //this.router.navigate(['/']);
  }

  public isAuthenticated(): boolean {

    // Check whether the current time is past the
    // access token's expiry time
    return !this.jwtHelper.isTokenExpired(this.access_token)
    //return new Date().getTime() < this._expiresAt && !!localStorage.getItem('isLoggedIn');
  }

  public getLoggedInUserId(): string {
    return this.jwtHelper.decodeToken(this.id_token)["sub"]
  }

  public decodeToken(token: string): any {
    return this.jwtHelper.decodeToken(token)
  }
}
