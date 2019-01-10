import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ClarityModule } from '@clr/angular';
import { AuthGuard } from '../auth/auth.guard';
import { ContactListComponent } from '../contact-list/contact-list.component';
import { Router } from 'express';

const routes: Routes = [
  {
    path: "contacts",
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        component: ContactListComponent,
      }
    ]
  }
];


@NgModule({
  declarations: [ContactListComponent],
  imports: [
    ClarityModule,
    CommonModule,
    RouterModule.forRoot(routes)
  ]
})
export class ContactsModule { }
