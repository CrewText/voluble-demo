import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ContactsService } from 'src/app/contacts.service';
import { Contact } from '../contact';


@Component({
  selector: 'app-contact-detail',
  templateUrl: './contact-detail.component.html',
  styleUrls: ['./contact-detail.component.css']
})
export class ContactDetailComponent implements OnInit {

  constructor(private contactsService: ContactsService,
    private route: ActivatedRoute) { }

  public contact: Contact;

  private getContact(id: string) {
    this.contactsService.getContact(id).subscribe((contactReq) => {
      this.contact = contactReq.data
    })
  }

  ngOnInit() {
    let id = this.route.snapshot.paramMap.get('id')
    this.getContact(id)
  }

}
