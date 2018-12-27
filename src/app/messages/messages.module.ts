import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';
import { MessagesListComponent } from './messagesList.component'
import { MatCardModule } from '@angular/material';
import { MatListModule } from '@angular/material/list'
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';

const routes: Routes = [
  { path: "messages", component: MessagesListComponent }
];

@NgModule({
  declarations: [MessagesListComponent],
  imports: [
    MatCardModule,
    MatListModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    MatIconModule,

    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class MessagesModule { }
