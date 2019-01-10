import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { JwtModule } from '@auth0/angular-jwt';
import { ClarityModule } from '@clr/angular';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';
import { ContactsModule } from './contacts/contacts.module';
import { MessagesModule } from './messages/messages.module';

export function getAuthToken(): string {
  return localStorage.getItem('access_token')
}

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [

    BrowserModule,
    BrowserAnimationsModule,
    MessagesModule,
    ContactsModule,
    AuthModule,
    HttpClientModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: getAuthToken,
        whitelistedDomains: ['localhost:4200', 'auth0.com', 'voluble-poc.herokuapp.com', 'crewtext.com', 'lvh.me:5000']
      }
    }),
    AppRoutingModule,
    ClarityModule,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
