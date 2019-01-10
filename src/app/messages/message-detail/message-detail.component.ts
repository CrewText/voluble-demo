import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router'
import { switchMap, tap } from 'rxjs/operators';
import { MessagesService } from '../../messages.service'
import { Message } from '../message'

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
      case "MSG_PENDING":
      case "MSG_SENDING":
        msg_icon = "hourglass"
        break;
      case "MSG_DELIVERED_SERVICE":
      case "MSG_SENT":
      case "MSG_DELIVERED_USER":
      case "MSG_READ":
        msg_icon = "check"
        break;
      case "MSG_REPLIED":
        msg_icon = "two-way-arrows"
        break
      case "MSG_FAILED":
        msg_icon = "error-standard"
        break
      case "MSG_ARRIVED":
        msg_icon = "envelope"
        break;
    }

    return msg_icon
  }

  public getMessageStatusColour(message_status: string): string {
    return message_status == "MSG_FAILED" ? "is-error" : (message_status == "MSG_PENDING" || message_status == "MSG_SENDING" ? "is-highlight" : "")
  }

  ngOnInit() {
    this.getContactDetails(this.message.contact)
  }

}
