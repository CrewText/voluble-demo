import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { RouterModule, Routes, CanActivate } from '@angular/router';
import { MessagesListComponent } from './messagesList.component'
import { MatCardModule } from '@angular/material';
import { MatListModule } from '@angular/material/list'
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button'
import { AuthGuard } from '../auth/auth.guard';
import { MessageDetailComponent } from './message-detail/message-detail.component';

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
    MatCardModule,
    MatListModule,
    MatSnackBarModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatIconModule,

    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class MessagesModule { }
