import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ClarityModule } from '@clr/angular';
import { IsAuthedGuard } from '../auth/auth.guard';
import { ContactListComponent } from '../contacts/contact-list/contact-list.component';
import { FormsModule } from '@angular/forms';
import { ContactEditorComponent } from './contact-editor/contact-editor.component';
import { ContactCreatorComponent } from './contact-creator/contact-creator.component';
import { ContactDetailComponent } from './contact-detail/contact-detail.component';
import { ContactsComponent } from './contacts.component';

const routes: Routes = [
  {
    path: "contacts",
    canActivate: [IsAuthedGuard],
    component: ContactsComponent,
    children: [
      {
        path: 'new',
        component: ContactCreatorComponent,
        data: { title: "Create Contact" }
      },
      {
        path: ':id',
        component: ContactDetailComponent
      },
      {
        path: '',
        component: ContactListComponent,
        data: { title: "Contact List" }
      },
    ]
  }
];


@NgModule({
  declarations: [ContactListComponent, ContactDetailComponent, ContactEditorComponent, ContactCreatorComponent, ContactDetailComponent, ContactsComponent],
  imports: [
    FormsModule,
    ClarityModule,
    CommonModule,
    RouterModule.forRoot(routes)
  ]
})
export class ContactsModule { }
