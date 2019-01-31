import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MessagesService } from '../../messages.service';
//import { Message } from '../message';
import { Message, MessageStates } from 'voluble-common'

@Component({
  selector: 'app-message-detail',
  templateUrl: './message-detail.component.html',
  styleUrls: ['./message-detail.component.css']
})
export class MessageDetailComponent implements OnInit {
  @Input() public message: Message
  public contact: any

  constructor(private messagesSvc: MessagesService,
    private activatedRoute: ActivatedRoute) { }

  public getMessage() {
    let id = this.activatedRoute.snapshot.paramMap.get('id')
    this.messagesSvc.getMessage(id)
      .subscribe((msg) => {
        this.message = msg.data
        this.messagesSvc.getContactDetails(msg.data.contact)
          .subscribe((contact) => {
            this.contact = contact.data
          })
      })
  }

  public getContactDetails(contact_id: string) {
    this.messagesSvc.getContactDetails(contact_id)
      .subscribe((contact) => {
        this.contact = contact.data
      })
  }

  public getMessageStatusIcon(message_status: string): string {
    let msg_icon = "mail";

    switch (message_status) {
      case MessageStates.MSG_PENDING:
      case MessageStates.MSG_SENDING:
        msg_icon = "hourglass"
        break;
      case MessageStates.MSG_DELIVERED_SERVICE:
      case MessageStates.MSG_DELIVERED_USER:
      case MessageStates.MSG_READ:
        msg_icon = "check"
        break;
      case MessageStates.MSG_REPLIED:
        msg_icon = "two-way-arrows"
        break
      case MessageStates.MSG_FAILED:
        msg_icon = "error-standard"
        break
      case MessageStates.MSG_ARRIVED:
        msg_icon = "envelope"
        break;
    }

    return msg_icon
  }

  public getMessageStatusColour(message_status: string): string {
    return message_status == MessageStates.MSG_FAILED ? "is-error" : (message_status == MessageStates.MSG_PENDING || message_status == MessageStates.MSG_SENDING ? "is-highlight" : "")
  }

  ngOnInit() {
    this.getContactDetails(this.message.contact)
  }

}
