import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ContactsService } from 'src/app/contacts.service';
import { Contact } from '../contact';
import { AuthService } from 'src/app/auth.service';
import { scopes } from 'voluble-common';


@Component({
  selector: 'app-contact-editor',
  templateUrl: './contact-editor.component.html',
  styleUrls: ['./contact-editor.component.css']
})
export class ContactEditorComponent implements OnInit {

  constructor(private contactsService: ContactsService,
    private route: ActivatedRoute,
    private authService: AuthService,
    private router: Router) { }

  @Input() public contact_id: string;
  @Input() public new_contact: boolean
  public contact: Contact;
  public userCanEdit = false
  public userCanDelete = false

  private getContact(id: string) {
    this.contactsService.getContact(id).subscribe((contactReq) => {
      this.contact = contactReq.data
    })
  }

  private determinePermissions() {
    this.userCanEdit = this.authService.userHasScope([scopes.VolubleAdmin]) || (!this.new_contact && this.authService.userHasScope([scopes.ContactEdit])) || (this.new_contact && this.authService.userHasScope([scopes.ContactAdd]))
    this.userCanDelete = this.authService.userHasScope([scopes.ContactDelete, scopes.VolubleAdmin])
  }

  public deleteContact() {
    this.contactsService.deleteContact(this.contact_id)
      .subscribe((deleteReq) => {
        if (deleteReq.status == "success") {
          this.router.navigate(['/contacts'])
        }
      })
  }

  public saveContact() {
    if (this.new_contact) {
      console.log(this.contact)
      this.contactsService.createNewContact(this.contact)
        .subscribe((contactCreateReq) => {
          console.log(contactCreateReq)
        })
    }
  }

  ngOnInit() {
    this.determinePermissions()
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
    console.log(this.userCanEdit)
    console.log([this.authService.userHasScope([scopes.VolubleAdmin]), (!this.new_contact && this.authService.userHasScope([scopes.ContactEdit])), (this.new_contact && this.authService.userHasScope([scopes.ContactAdd]))])
  }
}