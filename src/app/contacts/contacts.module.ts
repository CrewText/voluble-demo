import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ClarityModule } from '@clr/angular';
import { AuthGuard } from '../auth/auth.guard';
import { ContactListComponent } from '../contacts/contact-list/contact-list.component';
import { FormsModule } from '@angular/forms';
import { ContactDetailComponent } from './contact-detail/contact-detail.component';
import { ContactCreatorComponent } from './contact-creator/contact-creator.component';

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
        path: 'new',
        component: ContactCreatorComponent,
        data: { title: "Create Contact" }
      },
      {
        path: ':id',
        component: ContactDetailComponent
      }
    ]
  }
];


@NgModule({
  declarations: [ContactListComponent, ContactDetailComponent, ContactCreatorComponent],
  imports: [
    FormsModule,
    ClarityModule,
    CommonModule,
    RouterModule.forRoot(routes)
  ]
})
export class ContactsModule { }
