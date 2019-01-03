import { Component, OnInit } from '@angular/core';
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
  public message: Message

  constructor(private messagesSvc: MessagesService,
    private activatedRoute: ActivatedRoute) { }

  public getMessage() {
    let id = this.activatedRoute.snapshot.paramMap.get('id')
    this.messagesSvc.getMessage(id)
      .subscribe((msg) => {
        console.log(msg.data)
        this.message = msg.data
      })
  }

  ngOnInit() {
    this.getMessage()
  }

}
