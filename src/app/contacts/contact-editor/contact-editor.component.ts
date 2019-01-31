import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ContactsService } from 'src/app/contacts.service';
import { Contact } from '../contact';
import { AuthService } from 'src/app/auth.service';


@Component({
  selector: 'app-contact-editor',
  templateUrl: './contact-editor.component.html',
  styleUrls: ['./contact-editor.component.css']
})
export class ContactEditorComponent implements OnInit {

  constructor(private contactsService: ContactsService,
    private route: ActivatedRoute,
    private authService: AuthService) { }

  @Input() public contact_id: string;
  @Input() public new_contact: boolean
  public contact: Contact;
  public userCanEdit = false
  public userCanDelete = false

  private getContact(id: string) {
    this.contactsService.getContact(id).subscribe((contactReq) => {
      this.contact = contactReq.data
      this.userCanEdit = this.authService.userHasScope(['contact:edit', 'voluble:admin'])
      this.userCanDelete = this.authService.userHasScope(['contact:delete', 'voluble:admin'])
    })
  }

  ngOnInit() {

    if (this.contact_id) {
      this.getContact(this.contact_id)
    } else {
      this.contact = {
        id: null,
        first_name: null,
        surname: null,
        email_address: null,
        phone_number: null,
        createdAt: null,
        updatedAt: null,
        OrganizationId: null,
        ServicechainId: null
      }
    }
  }
}