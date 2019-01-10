import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NoOrganizationComponent } from '../no-organization/no-organization.component';
import { CallbackComponent } from './callback/callback.component';
import { ClarityModule } from '@clr/angular';


const routes: Routes = [
  {
    path: 'auth', children: [
      { path: "callback", component: CallbackComponent }
    ]
  }
];

@NgModule({
  declarations: [CallbackComponent, NoOrganizationComponent],
  imports: [
    ClarityModule,
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AuthModule { }

