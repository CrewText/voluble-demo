import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClarityModule } from '@clr/angular';
import { AuthGuard } from '../auth/auth.guard';
import { MessageDetailComponent } from './message-detail/message-detail.component';
import { MessagesListComponent } from './messagesList.component';


const routes: Routes = [
  {
    path: "messages",
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        component: MessagesListComponent,
      },
      {
        path: ':id',
        component: MessageDetailComponent
      }
    ]
  }
];

@NgModule({
  declarations: [MessagesListComponent, MessageDetailComponent],
  imports: [
    ClarityModule,
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class MessagesModule { }