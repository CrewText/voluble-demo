import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClarityModule } from '@clr/angular';
import { AuthGuard } from '../auth/auth.guard';
import { MessageDetailComponent } from './message-detail/message-detail.component';
import { MessagesListComponent } from './messagesList.component';
import { MessageComposerComponent } from './message-composer/message-composer.component';
import { FormsModule } from '@angular/forms';


const routes: Routes = [
  {
    path: "messages",
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        component: MessagesListComponent,
        data: { title: "Message List" },
        pathMatch: 'full',
      },
      {
        path: 'compose',
        component: MessageComposerComponent,
        data: { title: 'Compose Message' },
        pathMatch: 'full'
      },
      {
        path: 'messages/:id',
        component: MessageDetailComponent
      },
    ]
  },


];

@NgModule({
  declarations: [MessagesListComponent, MessageDetailComponent, MessageComposerComponent],
  imports: [
    ClarityModule,
    FormsModule,
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class MessagesModule { }