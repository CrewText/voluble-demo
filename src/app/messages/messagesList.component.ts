import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { MessagesService } from '../messages.service'
import { Message } from './message'
import { HttpErrorResponse } from '@angular/common/http';
import { AuthService } from '../auth.service'

@Component({
  selector: 'app-messagesList',
  templateUrl: './messagesList.component.html',
  styleUrls: ['./messagesList.component.css',]
})
export class MessagesListComponent implements OnInit {

  constructor(private messagesService: MessagesService,
    public authService: AuthService,
    public snackBar: MatSnackBar) { }
  messages: Message[] = []
  isLoading = true

  get100Messages(offset: number = 0) {
    this.messagesService.get100Messages().subscribe((messagesReq) => {
      console.log(messagesReq.status)
      console.log(messagesReq.data[0])
      this.messages.push(...messagesReq.data)
      this.isLoading = false
    }, (error) => {
      this.onHttpClientError(error)
    })
  }

  onHttpClientError(error: HttpErrorResponse) {
    this.isLoading = false;
    console.error(error.message)
    this.snackBar.open(error.message, "OK", { panelClass: "warn" })
  }

  ngOnInit() {
    console.log("Inited MessagesList")
    if (this.authService.isAuthenticated()) {
      this.get100Messages()
    }
  }

}
