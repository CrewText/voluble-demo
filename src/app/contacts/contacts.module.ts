import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ClarityModule } from '@clr/angular';
import { AuthGuard } from '../auth/auth.guard';
import { ContactListComponent } from '../contacts/contact-list/contact-list.component';
import { FormsModule } from '@angular/forms';
import { ContactDetailComponent } from './contact-detail/contact-detail.component';

const routes: Routes = [
  {
    path: "contacts",
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        component: ContactListComponent,
        data: { title: "Contact List" }
      },
      {
        path: ':id',
        component: ContactDetailComponent
      }
    ]
  }
];


@NgModule({
  declarations: [ContactListComponent, ContactDetailComponent],
  imports: [
    FormsModule,
    ClarityModule,
    CommonModule,
    RouterModule.forRoot(routes)
  ]
})
export class ContactsModule { }
