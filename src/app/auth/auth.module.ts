import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { RouterModule, Routes } from '@angular/router';
import { NoOrganizationComponent } from '../no-organization/no-organization.component';
import { CallbackComponent } from './callback/callback.component';

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
    MatProgressSpinnerModule,
    CommonModule,
    MatCardModule,
    MatButtonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AuthModule { }

