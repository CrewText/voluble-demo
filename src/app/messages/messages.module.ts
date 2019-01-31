import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClarityModule } from '@clr/angular';
import { IsAuthedGuard } from '../auth/auth.guard';
import { MessageDetailComponent } from './message-detail/message-detail.component';
import { MessagesListComponent } from './messagesList.component';
import { MessageComposerComponent } from './message-composer/message-composer.component';
import { FormsModule } from '@angular/forms';
import { HasScopeGuard } from '../auth/has-scope.guard';
import { scopes } from "voluble-common"


const routes: Routes = [
  {
    path: "messages",
    canActivate: [IsAuthedGuard],
    children: [
      {
        path: '',
        component: MessagesListComponent,
        canActivate: [HasScopeGuard],
        data: { title: "Message List", scopes: [scopes.MessageRead, scopes.VolubleAdmin] },
        pathMatch: 'full',
      },
      {
        path: 'compose',
        component: MessageComposerComponent,
        canActivate: [HasScopeGuard],
        data: { title: 'Compose Message', scopes: [scopes.MessageSend, scopes.VolubleAdmin] },
        pathMatch: 'full'
      },
      {
        path: 'messages/:id',
        canActivate: [HasScopeGuard],
        data: { scopes: [scopes.MessageRead, scopes.VolubleAdmin] },
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