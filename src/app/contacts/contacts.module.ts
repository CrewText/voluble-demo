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
import { HasScopeGuard } from '../auth/has-scope.guard';

const routes: Routes = [
  {
    path: "contacts",
    canActivate: [IsAuthedGuard],
    component: ContactsComponent,
    children: [
      {
        path: 'new',
        component: ContactCreatorComponent,
        canActivate: [HasScopeGuard],
        data: { title: "Create Contact", scopes: ["contact:add", "voluble:admin"] }
      },
      {
        path: ':id',
        component: ContactDetailComponent,
        canActivate: [HasScopeGuard],
        data: { scopes: ["contact:view", "contact:edit", "voluble:admin"] }
      },
      {
        path: '',
        canActivate: [HasScopeGuard],
        component: ContactListComponent,
        data: { title: "Contact List", scopes: ["contact:view", "voluble:admin"] }
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
