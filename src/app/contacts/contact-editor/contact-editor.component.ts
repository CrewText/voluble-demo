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
      if (this.route.snapshot.paramMap.get('id')) {
        this.contact_id = this.route.snapshot.paramMap.get('id')
        // can we move this logic to a component that is just for the route and add
        // an <app-contact-editor> to it, like contact-creator?
        this.getContact(this.contact_id)
      } else {
        //create new contact
      }
    }
  }

}
