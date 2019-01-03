import { Injectable } from '@angular/core';
import * as Promise from 'bluebird'
import * as auth0 from 'auth0-js'
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private jwtHelper: JwtHelperService) { }

  private auth0 = new auth0.WebAuth({
    clientID: 'COMAy4nBatqEuGzdTHEzOOc2ucpRywcs',
    domain: 'voluble-dev.eu.auth0.com',
    responseType: 'token id_token',
    redirectUri: 'http://localhost:4200/auth/callback',
    scope: 'openid profile',
    audience: 'https://voluble-poc.herokuapp.com'
  });

  /**
   * Retrieves the authorization token.
   */
  public get auth_token(): string {
    return localStorage.getItem('access_token')
  }


  public set auth_token(v: string) {
    localStorage.setItem('access_token', v)
  }


  public get id_token(): string {
    return localStorage.getItem('id_token')
  }

  public set id_token(v: string) {
    localStorage.setItem('id_token', v)
  }

  public login(): void {
    this.auth0.authorize()
  }

  public handleAuthentication(): void {
    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        window.location.hash = '';
        this.setSession(authResult);
        //this.router.navigate(['/home']);
      } else if (err) {
        //this.router.navigate(['/home']);
      }
    });
  }

  private setSession(authResult): void {
    // Set isLoggedIn flag in localStorage
    localStorage.setItem('isLoggedIn', 'true');
    this.auth_token = authResult.accessToken
    this.id_token = authResult.idToken
  }

  public renewSession(): void {
    this.auth0.checkSession({}, (err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        this.setSession(authResult);
      } else if (err) {
        //alert(`Could not get a new token (${err.error}: ${err.error_description}).`);
        this.logout();
      }
    });
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
    return !this.jwtHelper.isTokenExpired(this.auth_token)
    //return new Date().getTime() < this._expiresAt && !!localStorage.getItem('isLoggedIn');
  }
}
