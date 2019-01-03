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
        msg_icon = "hourglass_empty"
        break;
      case "MSG_DELIVERED_SERVICE":
        msg_icon = "done"
        break;
      case "MSG_SENT":
      case "MSG_DELIVERED_USER":
        msg_icon = "done_all"
        break;
      case "MSG_READ":
        msg_icon = "drafts"
        break
      case "MSG_REPLIED":
        msg_icon = "reply"
        break
      case "MSG_FAILED":
        msg_icon = "error"
        break
      case "MSG_ARRIVED":
        msg_icon = "subdirectory_arrow_right"
        break;
    }

    return msg_icon
  }

  public getMessageStatusColour(message_status: string): string {
    return message_status == "MSG_FAILED" ? "warn" : (message_status == "MSG_PENDING" || message_status == "MSG_SENDING" ? "accent" : "primary")
  }

  ngOnInit() {
    this.getContactDetails(this.message.contact)
  }

}
