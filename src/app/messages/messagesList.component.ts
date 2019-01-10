import { Component, OnInit } from '@angular/core';
import { MessagesService } from '../messages.service'
import { Message } from './message'
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-messagesList',
  templateUrl: './messagesList.component.html',
  styleUrls: ['./messagesList.component.css',]
})
export class MessagesListComponent implements OnInit {

  constructor(private messagesService: MessagesService) { }
  messages: Message[] = []
  isLoading = true

  get100Messages(offset: number = 0) {
    this.messagesService.get100Messages().subscribe((messagesReq) => {
      // messagesReq.data.forEach(msg => {
      //   switch()
      //   msg.icon = this.getMessageStatusIcon(msg)
      // });
      this.messages.push(...messagesReq.data)
      this.isLoading = false
    }, (error) => {
      this.onHttpClientError(error)
    })
  }

  onHttpClientError(error: HttpErrorResponse) {
    this.isLoading = false;
    console.error(error.message)
    //this.snackBar.open(error.message, "OK", { panelClass: "warn" })
  }

  ngOnInit() {
    this.get100Messages()
  }

}
