import { Component, OnInit } from '@angular/core';
import { ContactsService } from '../../contacts.service';
import { ClrDatagridStateInterface } from "@clr/angular";
import { ClrDatagridStringFilterInterface } from "@clr/angular";

class ContactFilter implements ClrDatagridStringFilterInterface<any>{

  accepts(contact: any, search: string): boolean {
    return contact.first_name.indexOf(search) > -1 || contact.surname.indexOf(search) > -1
  }
}

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit {
  public contacts: any[] = []
  public contactFilter = new ContactFilter()
  public nameSearch: string

  constructor(private contactsService: ContactsService) { }

  get100Contacts(offset: number) {
    this.contactsService.get100Contacts(offset).subscribe((contactsReq) => {
      this.contacts.push(...contactsReq.data)
    })
  }

  trackByContactId(index: number, contact: any) { return contact.id }

  ngOnInit() {
    this.get100Contacts(0)
  }

  onRefresh(state: ClrDatagridStateInterface) {
    this.contacts = []
    let offset = (state.page.to - 1) * 100
    this.get100Contacts(offset)
  }

}
