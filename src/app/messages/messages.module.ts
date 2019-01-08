import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../auth/auth.guard';
import { MessageDetailComponent } from './message-detail/message-detail.component';
import { MessagesListComponent } from './messagesList.component';
import { MatToolbarModule } from '@angular/material/toolbar'


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
    MatToolbarModule,
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