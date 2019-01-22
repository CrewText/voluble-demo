import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewOrgWizardComponent } from './new-org-wizard/new-org-wizard.component';
import { Routes, RouterModule } from '@angular/router';
import { OrgInfoComponent } from './org-info/org-info.component';
import { ClrWizardModule, ClrFormsModule } from '@clr/angular';
import { FormsModule } from '@angular/forms';

const routes: Routes = [
  {
    path: 'orgs',
    children: [
      {
        path: '',
        component: OrgInfoComponent,
        data: { title: "My Organization" }
      },
      {
        path: 'new',
        component: NewOrgWizardComponent
      }
    ]
  }
]

@NgModule({
  declarations: [NewOrgWizardComponent, OrgInfoComponent],
  imports: [
    CommonModule,
    ClrWizardModule,
    ClrFormsModule,
    FormsModule,
    RouterModule.forRoot(routes)
  ]
})
export class OrgsModule { }
