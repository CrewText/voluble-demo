import { Component, OnInit } from '@angular/core';
import { ContactsService } from '../contacts.service';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit {
  public contacts: any[] = []

  constructor(private contactsService: ContactsService) { }

  getContacts() {
    this.contactsService.getContacts().subscribe((contactsReq) => {
      this.contacts.push(...contactsReq.data)
    })
  }

  ngOnInit() {
    this.getContacts()
  }

}
