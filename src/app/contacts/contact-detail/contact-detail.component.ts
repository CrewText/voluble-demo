import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ContactsService } from 'src/app/contacts.service';
import { Contact } from '../contact';
import { AuthService } from 'src/app/auth.service';


@Component({
  selector: 'app-contact-detail',
  templateUrl: './contact-detail.component.html',
  styleUrls: ['./contact-detail.component.css']
})
export class ContactDetailComponent implements OnInit {

  constructor(private contactsService: ContactsService,
    private route: ActivatedRoute,
    private authService: AuthService) { }

  public contact: Contact;
  public userCanEdit = false

  private getContact(id: string) {
    this.contactsService.getContact(id).subscribe((contactReq) => {
      this.contact = contactReq.data
      this.userCanEdit = this.authService.userHasScope(['contact:edit', 'voluble:admin'])
    })
  }

  ngOnInit() {
    let id = this.route.snapshot.paramMap.get('id')
    this.getContact(id)
  }

}
